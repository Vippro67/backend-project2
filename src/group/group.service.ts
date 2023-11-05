import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGrouptDto } from './dto/create-group.dto';
import { UpdateGrouptDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { async } from 'rxjs';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}
  findAll() {
    return this.groupRepository.findAndCount({
      relations: ['users'],
      select: {
        id: true,
        name: true,
        users: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        avatar: true,
      },
    });
  }

  findOne(id: string) {
    return this.groupRepository.findOne({
      where: { id },
      relations: ['users'],
      select: {
        id: true,
        name: true,
        users: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
      },
    });
  }

  findAllByUser(user_id: string) {
    return this.groupRepository.find({
      where: { users: { id: user_id } },
      relations: ['users'],
      select: {
        id: true,
        name: true,
        users: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
      },
    });
  }

  async create(user_id: string, createGroupDto: CreateGrouptDto) {
    const user: DeepPartial<User> = { id: user_id };
    return await this.groupRepository.save({
      name: createGroupDto.name,
      users: [user],
    });
  }

  async updateAvatar(user_id: string, id: string, avatar: string) {
    const group = await this.groupRepository.findOne({
      where: { id, users: { id: user_id } },
      relations: ['users'],
    });

    if (!group) {
      throw new Error('Group not found or user is not part of the group');
    }
    return this.groupRepository.update(
      { id },
      {
        avatar,
      },
    );
  }

  async update(user_id: string, id: string, updateGroupDto: UpdateGrouptDto) {
    const group = await this.groupRepository.findOne({
      where: { id, users: { id: user_id } },
      relations: ['users'],
    });

    if (!group) {
      throw new Error('Group not found or user is not part of the group');
    }
    return this.groupRepository.update(
      { id, users: { id: user_id } },
      {
        name: updateGroupDto.name,
      },
    );
  }
  async join(user_id: string, id: string) {
    try {
      //only add user to group if user is not already part of the group
      
      const user = await this.userRepository.findOne({where: {id: user_id}, relations: ['groups']});
      const group = await this.groupRepository.findOne({where: {id}, relations: ['users']});
      if(!user || !group) {
        throw new HttpException(
          'User or group not found',
          HttpStatus.BAD_REQUEST,
        );
      } 
      const isUserPartOfGroup = group.users.some((user) => user.id === user_id);
      if(isUserPartOfGroup) {
        throw new HttpException(
          'User is already part of the group',
          HttpStatus.BAD_REQUEST,
        );      }

      await this.groupRepository
        .createQueryBuilder()
        .relation(Group, 'users')
        .of(id)
        .add(user_id);

      return this.groupRepository.findOne({
        where: { id },
        relations: ['users'],
      });
    } catch (error) {
      throw new HttpException(
        'Can not join group',
        HttpStatus.BAD_REQUEST,
      );    }
  }

async leave(user_id: string, id: string) {
    try {
      const user = await this.userRepository.findOne({where: {id: user_id}, relations: ['groups']});
      const group = await this.groupRepository.findOne({where: {id}, relations: ['users']});
      if(!user || !group) {
        throw new HttpException(
          'User or group not found',
          HttpStatus.BAD_REQUEST,
        );
      } 
      const isUserPartOfGroup = group.users.some((user) => user.id === user_id);
      if(!isUserPartOfGroup) {
        throw new HttpException(
          'User is not part of the group',
          HttpStatus.BAD_REQUEST,
        );      }

      await this.groupRepository
        .createQueryBuilder()
        .relation(Group, 'users')
        .of(id)
        .remove(user_id);

      return this.groupRepository.findOne({
        where: { id },
        relations: ['users'],
      });
    } catch (error) {
      throw new HttpException(
        'Can not leave group',
        HttpStatus.BAD_REQUEST,
      );    }
}


  async remove(user_id: string, id: string) {
    try {
      const group = await this.groupRepository.findOne({
        where: { id, users: { id: user_id } },
        relations: ['users'],
      });
      if (!group) {
        throw new Error('Group not found or user is not part of the group');
      }
      return this.groupRepository.delete({ id });
    } catch (error) {
      throw new HttpException(
        'Can not delete group',
        HttpStatus.BAD_REQUEST,
      );    }
  }
}
