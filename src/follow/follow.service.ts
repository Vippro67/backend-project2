import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async followUser(user_id: number, following_id: number) {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const following = await this.userRepository.findOne({
      where: { id: following_id },
    });
    if (!following) {
      throw new HttpException(
        'Following user not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user_id == following_id) {
      throw new HttpException(
        'You cannot follow yourself',
        HttpStatus.BAD_REQUEST,
      );
    }
    const followExist = await this.followRepository.findOne({
      where: {
        follower: {
          id: user_id,
        },
        following: {
          id: following_id,
        },
      },
    });
    if (followExist) {
      throw new HttpException(
        'You are already following this user',
        HttpStatus.BAD_REQUEST,
      );
    }
    const follow = this.followRepository.create({
      follower: user,
      following: following,
    });
    return await this.followRepository.save(follow);
  }

  async unfollowUser(user_id: number, following_id: number) {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error('User not found');
    }
    const following = await this.userRepository.findOne({
      where: { id: following_id },
    });
    if (!following) {
      throw new Error('Following user not found');
    }
    const followExist = await this.followRepository.findOne({
      where: {
        follower: {
          id: user_id,
        },
        following: {
          id: following_id,
        },
      },
    });
    if (!followExist) {
      throw new HttpException(
        'You are not following this user',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.followRepository.delete(followExist);
  }
}
