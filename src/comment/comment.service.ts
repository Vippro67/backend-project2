import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
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

  async create(commentData: Partial<Comment>): Promise<Comment> {
    const comment = this.commentRepository.create(commentData);
    this.commentRepository.save(comment);
    return comment;
  }

  async update(id: number,user_id:number, commentData: Partial<Comment>): Promise<Comment> {
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
