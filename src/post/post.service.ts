import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { FilterPostDto } from './dto/filter-post.dto';
import { Media } from 'src/media/entities/media.entity';
import { MediaType } from 'src/media/enum/MediaType';
import { Tag } from 'src/tag/entities/tag.entity';

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

  async findAll(filterquery: FilterPostDto) {
    const page = filterquery.page || 1;
    const items_per_page = filterquery.items_per_page || 10;
    const search = filterquery.search || '';
    const skip = items_per_page * (page - 1);
    const [res, total] = await this.postRepository.findAndCount({
      order: { updated_at: 'DESC' },
      relations: ['user', 'comments', 'media'],
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
      relations: ['user', 'comments', 'media'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
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
    console.log(createPostDto.tagNames);
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
        media.link = file.destination + '/' + file.filename;
        media.post = savedPost;
        await this.mediaRepository.save(media);
        savedPost.media = media;
        await this.postRepository.update(
          { id: savedPost.id },
          { media: media },
        );
      }
      if (createPostDto.tagNames) {
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
        const savedPost = await this.postRepository.save(post);

        return savedPost;
      }
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
    postData: Partial<Post>,
    file: Express.Multer.File,
  ): Promise<UpdateResult> {
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
    if (file) {
      const media = new Media();
      const type = file.mimetype.split('/')[0];
      if (type == 'image') {
        media.type = MediaType.IMAGE;
      } else if (type == 'video') {
        media.type = MediaType.VIDEO;
      }
      media.link = file.destination + '/' + file.filename;
      media.post = post;
      await this.mediaRepository.delete({ post: post });
      const savedMedia = await this.mediaRepository.save(media);
      await this.postRepository.update(post.id, { media: savedMedia });
    } else {
      await this.mediaRepository.delete({ post: post });
      await this.postRepository.update(post.id, { media: null });
    }
    return await this.postRepository.update(post.id, postData);
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
