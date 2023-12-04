import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Relationship } from './entities/relationship.entity';
import { User } from 'src/user/entities/user.entity';
import { Not } from 'typeorm';
export class RelationshipService {
  constructor(
    @InjectRepository(Relationship)
    private relationshipRepository: Repository<Relationship>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllRelationships(): Promise<Relationship[]> {
    return await this.relationshipRepository.find({
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        friend: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        isFriend: true,
        status: true,
        isFollowing: true,
        isBlocked: true,
      },
    });
  }

  async getRecommendedRelationships(userId: string): Promise<Relationship[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    const friends = user.friendships.map((friend) => friend.id);
    const relationships = await this.relationshipRepository.find({
      where: {
        user: { id: Not(In(friends)) },
        friend: { id: Not(userId) },
      },
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        friend: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        isFriend: true,
        status: true,
        isFollowing: true,
        isBlocked: true,
      },
    });
    return relationships;
  }

  async getRelationshipsByUserId(id: string): Promise<Relationship[]> {
    return await this.relationshipRepository.find({
      where: { user: { id } },
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        friend: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        isFriend: true,
        status: true,
        isFollowing: true,
        isBlocked: true,
      },
    });
  }

  async getMyFriends(userId: string): Promise<Relationship[]> {
    return await this.relationshipRepository.find({
      where: [{ user: { id: userId } }, { friend: { id: userId } }],
      relations: ['friend', 'user'],
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        friend: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        isFriend: true,
        status: true,
        isFollowing: true,
        isBlocked: true,
      },
    });
  }

  async getRelationshipById(id: string): Promise<Relationship> {
    return await this.relationshipRepository.findOne({
      where: { id },
      select: {
        user: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        friend: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        isFriend: true,
        status: true,
        isFollowing: true,
        isBlocked: true,
      },
    });
  }

  async addFriend(userId: string, friendId: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const friend = await this.userRepository.findOne({
        where: { id: friendId },
      });
      enum RelationshipStatus {
        PENDING = 'pending',
        CONFIRMED = 'confirmed',
      }
      const relationship = new Relationship();
      relationship.user = user;
      relationship.friend = friend;
      relationship.isFriend = true;
      relationship.status = RelationshipStatus.PENDING;
      await this.relationshipRepository.save(relationship);
      return new HttpException('Friend request sent', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async acceptFriend(userId: string, friendId: string) {
    try {
      const relationship = await this.relationshipRepository.findOne({
        where: {
          user: { id: friendId },
          friend: { id: userId },
        },
      });
      enum RelationshipStatus {
        PENDING = 'pending',
        CONFIRMED = 'confirmed',
      }
      relationship.isFriend = true;
      relationship.status = RelationshipStatus.CONFIRMED;
      await this.relationshipRepository.save(relationship);
      return new HttpException('Friend request accepted', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async blockFriend(userId: string, friendId: string) {
    try {
      const relationship = await this.relationshipRepository.findOne({
        where: {
          user: { id: userId },
          friend: { id: friendId },
        },
      });
      relationship.isBlocked = true;
      await this.relationshipRepository.save(relationship);
      return new HttpException('Friend blocked', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unblockFriend(userId: string, friendId: string) {
    try {
      const relationship = await this.relationshipRepository.findOne({
        where: {
          user: { id: userId },
          friend: { id: friendId },
        },
      });
      relationship.isBlocked = false;
      await this.relationshipRepository.save(relationship);
      return new HttpException('Friend unblocked', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async rejectFriend(userId: string, friendId: string) {
    try {
      const relationship = await this.relationshipRepository.findOne({
        where: {
          user: { id: friendId },
          friend: { id: userId },
        },
      });
      if (relationship.status === 'pending') {
        await this.relationshipRepository.save(relationship);
      } else {
        throw new HttpException(
          'You are not allowed to reject this friend request',
          HttpStatus.FORBIDDEN,
        );
      }
      return new HttpException('Friend request rejected', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unfriend(userId: string, friendId: string) {
    try {
      const relationship = await this.relationshipRepository.findOne({
        where: {
          user: { id: userId },
          friend: { id: friendId },
        },
      });
      if (relationship.status === 'confirmed') {
        await this.relationshipRepository.save(relationship);
      } else {
        throw new HttpException(
          'You are not allowed to unfriend this user',
          HttpStatus.FORBIDDEN,
        );
      }
      return new HttpException('Friend unfriended', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async follow(userId: string, friendId: string) {
    try {
      const relationship = await this.relationshipRepository.findOne({
        where: {
          user: { id: userId },
          friend: { id: friendId },
        },
      });
      relationship.isFollowing = true;
      await this.relationshipRepository.save(relationship);
      return new HttpException('Friend followed', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async unfollow(userId: string, friendId: string) {
    try {
      const relationship = await this.relationshipRepository.findOne({
        where: {
          user: { id: userId },
          friend: { id: friendId },
        },
      });
      relationship.isFollowing = false;
      await this.relationshipRepository.save(relationship);
      return new HttpException('Friend unfollowed', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
