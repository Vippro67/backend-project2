import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { FilterPostDto } from './dto/filter-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(filterquery: FilterPostDto) {
    const page = filterquery.page || 1;
    const items_per_page = filterquery.items_per_page || 10;
    const search = filterquery.search || '';
    const skip = items_per_page * (page - 1);
    const [res, total] = await this.postRepository.findAndCount({
      order: { updated_at: 'DESC' },
      relations: ['user', 'comments'],
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

  async findOne(id:number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
      relations: ['user','comments'],
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
  }

  async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id: userId });
    try {
      const res = await this.postRepository.save({
        ...createPostDto,
        user,
      });

      return await this.postRepository.findOneBy({ id: res.id });
    } catch (error) {
      throw new HttpException('Can not create post', HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    userId: number,
    postData: Partial<Post>,
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
