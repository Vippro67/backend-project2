import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { FilterPostDto } from './dto/filter-post.dto';
import { Media } from 'src/media/entities/media.entity';
import { MediaType } from 'src/media/enum/MediaType';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async findAll(filterquery: FilterPostDto) {
    const page = filterquery.page || 1;
    const items_per_page = filterquery.items_per_page || 10;
    const search = filterquery.search || '';
    const skip = items_per_page * (page - 1);
    const [res, total] = await this.postRepository.findAndCount({
      order: { updated_at: 'DESC' },
      relations: ['user', 'comments', 'medias'],
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
        medias: true,
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

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments', 'medias'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          avatar: true,
        },
        comments: true,
        medias: true,
      },
    });
  }

  async create(
    userId: number,
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
        media.link = file.destination + '/' + file.filename;
        media.post = savedPost;
        await this.mediaRepository.save(media);
        return this.postRepository.findOne({
          where: { id: savedPost.id },
          relations: ['user', 'comments', 'medias'],
          select: {
            user: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              avatar: true,
            },
            comments: true,
            medias: true,
          },
        });
      }
    } catch (error) {
      throw new HttpException(
        'Can not create post :' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: number,
    userId: number,
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
    if (post.user.id !== userId) {
      throw new HttpException(
        'You are not authorized to edit this post',
        HttpStatus.UNAUTHORIZED,
      );
    }
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
      this.mediaRepository.delete({ post: post });
      await this.mediaRepository.save(media);
      
    }
    return await this.postRepository.update({ id }, postData);
  }
  async remove(id: number, userId: number): Promise<void> {
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
