import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { FilterPostDto } from './dto/filter-post.dto';
import { Media } from 'src/media/entities/media.entity';
import { MediaType } from 'src/media/enum/MediaType';
import { Tag } from 'src/tag/entities/tag.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}
  keyID: string = process.env.AWS_ACCESS_KEY_ID;
  keySecret: string = process.env.AWS_SECRET_ACCESS_KEY;
  region: string = process.env.AWS_REGION;
  bucketName: string = process.env.AWS_S3_BUCKET_NAME;

  s3 = new AWS.S3({
    accessKeyId: this.keyID,
    secretAccessKey: this.keySecret,
  });
  async findAll(filterquery: FilterPostDto) {
    const page = filterquery.page || 1;
    const items_per_page = filterquery.items_per_page || 10;
    const search = filterquery.search || '';
    const skip = items_per_page * (page - 1);
    const [res, total] = await this.postRepository.findAndCount({
      order: { updated_at: 'DESC' },
      relations: ['user', 'comments', 'media', 'tags'],
      where: {
        title: Like(`%${search}%`),
        user: {
          first_name: Like(`%${search}%`),
          last_name: Like(`%${search}%`),
        },
      },
      take: items_per_page,
      skip: skip,
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        tags: {
          name: true,
        },
      },
    });
    const totalPage = Math.ceil(total / items_per_page);
    const nextPage = Number(page) + 1 <= totalPage ? Number(page) + 1 : null;
    const prePage = Number(page) - 1 > 0 ? Number(page) - 1 : null;

    return {
      data: res,
      total,
      currentPage: page,
      items_per_page,
      totalPage,
      nextPage,
      prePage,
    };
  }

  async findOne(id: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'media', 'tags'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        tags: {
          name: true,
        },
      },
    });
  }

  async create(
    userId: string,
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const post = new Post();
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.user = user;
    try {
      const savedPost = await this.postRepository.save(post);
      if (file) {
        const media = new Media();
        const type = file.mimetype.split('/')[0];
        if (type == 'image') {
          media.type = MediaType.IMAGE;
        } else if (type == 'video') {
          media.type = MediaType.VIDEO;
        }
        media.link = '';
        media.post = savedPost;
        await this.mediaRepository.save(media);
        savedPost.media = media;
        const params = {
          Bucket: this.bucketName,
          Key: `post/${Date.now()}_${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        };
        try {
          const result = await this.s3.upload(params).promise();
          media.link = result.Location;
          post.media = await this.mediaRepository.save(media);
        } catch (error) {
          throw new BadRequestException('Failed to upload media: ' + error);
        }
      }
      if (createPostDto.tagNames) {
        if (Array.isArray(createPostDto.tagNames)) {
          const tags: Tag[] = await Promise.all(
            createPostDto.tagNames.map(async (tagName) => {
              const lowerCaseTagName = tagName.toLowerCase();
              let tag = await this.tagRepository.findOne({
                where: { name: lowerCaseTagName },
              });
              if (!tag) {
                tag = this.tagRepository.create({ name: lowerCaseTagName });
                await this.tagRepository.save(tag);
              }
              return tag;
            }),
          );
          post.tags = tags;
        } else {
          const tagNames: string[] = createPostDto.tagNames;
          const tagNamesString = JSON.stringify(tagNames);
          const cleanedTagNames = tagNamesString.replace(/[\[\]"\\]/g, '');
          const finalTagNames = cleanedTagNames.split(',');
          console.log(finalTagNames);
          const tags: Tag[] = await Promise.all(
            finalTagNames.map(async (tagName) => {
              const lowerCaseTagName = tagName.toLowerCase();
              let tag = await this.tagRepository.findOne({
                where: { name: lowerCaseTagName },
              });
              if (!tag) {
                tag = this.tagRepository.create({ name: lowerCaseTagName });
                await this.tagRepository.save(tag);
              }
              return tag;
            }),
          );
          post.tags = tags;
        }
      }
      await this.postRepository.save(post);
      return this.postRepository.findOne({
        where: { id: savedPost.id },
        relations: ['user', 'comments', 'media', 'tags'],
        select: {
          user: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            avatar: true,
          },
          comments: true,
          tags: {
            name: true,
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        'Can not create post :' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    userId: string,
    updatePostDto: UpdatePostDto,
    file: Express.Multer.File,
  ) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
      },
    });
    if (post.user.id !== userId) {
      throw new HttpException(
        'You are not authorized to update this post',
        HttpStatus.UNAUTHORIZED,
      );
    }
    post.title = updatePostDto.title;
    post.description = updatePostDto.description;
    if (file) {
      const media = new Media();
      const type = file.mimetype.split('/')[0];
      if (type == 'image') {
        media.type = MediaType.IMAGE;
      } else if (type == 'video') {
        media.type = MediaType.VIDEO;
      }
      const params = {
        Bucket: this.bucketName,
        Key: `post/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
      try {
        const result = await this.s3.upload(params).promise();
        media.link = result.Location;
      } catch (error) {
        throw new BadRequestException('Failed to upload avatar' + error);
      }
      media.post = post;
      await this.mediaRepository.delete({ post: post });
      const savedMedia = await this.mediaRepository.save(media);
      await this.postRepository.update(post.id, { media: savedMedia });
    } else {
      await this.mediaRepository.delete({ post: post });
      await this.postRepository.update(post.id, { media: null });
    }
    if (updatePostDto.tagNames) {      
      if (Array.isArray(updatePostDto.tagNames)) {
        const tags: Tag[] = await Promise.all(
          updatePostDto.tagNames.map(async (tagName) => {
            const lowerCaseTagName = tagName.toLowerCase();
            let tag = await this.tagRepository.findOne({
              where: { name: lowerCaseTagName },
            });
            if (!tag) {
              tag = this.tagRepository.create({ name: lowerCaseTagName });
              await this.tagRepository.save(tag);
            }
            return tag;
          }),
        );
        post.tags = tags;
      } else {
        const tagNames: string[] = updatePostDto.tagNames;
        const tagNamesString = JSON.stringify(tagNames);
        const cleanedTagNames = tagNamesString.replace(/[\[\]"\\]/g, '');
        const finalTagNames = cleanedTagNames.split(',');
        const tags: Tag[] = await Promise.all(
          finalTagNames.map(async (tagName) => {
            const lowerCaseTagName = tagName.toLowerCase();
            let tag = await this.tagRepository.findOne({
              where: { name: lowerCaseTagName },
            });
            if (!tag) {
              tag = this.tagRepository.create({ name: lowerCaseTagName });
              await this.tagRepository.save(tag);
            }
            return tag;
          }),
        );
        post.tags = tags;
      }
    }

    return await this.postRepository.save(post);
  }
  async remove(id: string, userId: string): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
      },
    });
    if (post.user.id !== userId) {
      throw new HttpException(
        'You are not authorized to delete this post',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.postRepository.delete(id);
  }
}
