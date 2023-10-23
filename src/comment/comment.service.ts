import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { FilterCommentDto } from './dto/filter-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(filterquery: FilterCommentDto) {
    const page = filterquery.page || 1;
    const items_per_page = filterquery.items_per_page || 10;
    const search = filterquery.search || '';
    const skip = items_per_page * (page - 1);
    const [res, total] = await this.commentRepository.findAndCount({
      where: {
        comment: Like(`%${search}%`),
        user: {
          first_name: Like(`%${search}%`),
          last_name: Like(`%${search}%`),
        },
      },
      skip: skip,
      order: { updated_at: 'DESC' },
      relations: ['user', 'post'],
      select: {
        user: {
          id: true,
        },
        post: {
          id: true,
        },
        // parentComment: {
        //   id: true,
        // },
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

  async findAllByPost(post_id: number): Promise<Comment[]> {
    return this.commentRepository.find({
      order: { updated_at: 'DESC' },
      relations: ['user', 'post'],
      where: {
        post: {
          id: post_id,
        },
      },
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        post: {
          id: true,
        },
        // parentComment: {
        //   id: true,
        // },
        // replies: {
        //   id: true,
        //   comment: true,
        //   created_at: true,
        //   updated_at: true,
        //   user: {
        //     id: true,
        //     first_name: true,
        //     last_name: true,
        //     avatar: true,
        //   },
        // },
      },
    });
  }

  async findAllByUser(user_id: number): Promise<Comment[]> {
    return this.commentRepository.find({
      order: { updated_at: 'DESC' },
      relations: ['user', 'post'],
      where: {
        user: {
          id: user_id,
        },
      },
      select: {
        user: {
          id: true,
        },
        post: {
          id: true,
          title: true,
          description: true,
        },
        // parentComment: {
        //   id: true,
        // },
      },
    });
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentRepository.findOne({
      where: {
        id: id,
      },
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        post: {
          id: true,
        },
        // parentComment: {
        //   id: true,
        // },
      },
    });
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create();
    this.commentRepository.save({ ...createCommentDto, ...comment });
    return comment;
  }

  async update(
    id: number,
    user_id: number,
    commentData: Partial<Comment>,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
      select: {
        user: {
          id: true,
        },
      },
    });
    if (comment.user.id !== user_id) {
      throw new HttpException(
        'You are not authorized to edit this comment',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.commentRepository.update(id, commentData);
    return this.commentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
