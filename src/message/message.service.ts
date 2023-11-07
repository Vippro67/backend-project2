import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from 'src/media/entities/media.entity';
import { MediaType } from 'src/media/enum/MediaType';
import { User } from 'src/user/entities/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { CreateCommnetDto } from 'src/comment/dto/create-comment.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}
  findAll() {
    return this.messageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver', 'group'],
      select: {
        id: true,
        content: true,

        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        receiver: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        group: {
          id: true,
          name: true,
          avatar: true,
        },
        created_at: true,
      },
    });
  }
  findOne(id: string) {
    return this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'receiver', 'group'],
      select: {
        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        receiver: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        group: {
          id: true,
          name: true,
          avatar: true,
        },
        content: true,
        created_at: true,
      },
    });
  }
  findAllBySender(sender_id: string) {
    return this.messageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver', 'group'],
      where: {
        sender: {
          id: sender_id,
        },
      },
      select: {
        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        receiver: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        group: {
          id: true,
          name: true,
          avatar: true,
        },
        content: true,
        created_at: true,
      },
    });
  }
  findAllByReceiver(receiver_id: string) {
    return this.messageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver', 'group'],
      where: {
        receiver: {
          id: receiver_id,
        },
      },
      select: {
        id: true,
        content: true,
        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        receiver: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        group: {
          id: true,
          name: true,
          avatar: true,
        },
        created_at: true,
      },
    });
  }
  findMyMessagesTo(id: any, receiver_id: string) {
    return this.messageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver'],
      where: {
        sender: {
          id: id,
        },
        receiver: {
          id: receiver_id,
        },
      },
      select: {
        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        receiver: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        content: true,
        created_at: true,
      },
    });
  }
  getUserConversation(id: any, user_id: string): Promise<Message[]> {
    return this.messageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver'],
      where: [
        { sender: { id: id }, receiver: { id: user_id } },
        { sender: { id: user_id }, receiver: { id: id } },
      ],
      select: {
        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        receiver: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        group: {
          id: true,
          name: true,
          avatar: true,
        },
        content: true,
        created_at: true,
      },
    });
  }

  getGroupConversation(id: any, group_id: string): Promise<Message[]> {
    return this.messageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'group'],
      where: { group: { id: group_id } },
      select: {
        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        content: true,
        created_at: true,
      },
    });
  }

  async create(
    user_id: string,
    createMessageDto:CreateMessageDto ,
    file: Express.Multer.File,
  ): Promise<Message> {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!user) {
      throw new Error('Sender not found');
    }
    const messageData = new Message();
    messageData.content = createMessageDto.content;
    messageData.sender = user;
    if(createMessageDto.receiver_id!= undefined)
      messageData.receiver = await this.userRepository.findOne({where:{id:createMessageDto.receiver_id}});
    if(createMessageDto.group_id!=undefined)
    messageData.group = await this.groupRepository.findOne({where:{id:createMessageDto.group_id}});
    const savedMessage = await this.messageRepository.save(messageData);
    let savedMedia;
    if (file) {
      const media = new Media();
      const type = file.mimetype.split('/')[0];
      if (type == 'image') {
        media.type = MediaType.IMAGE;
      } else if (type == 'video') {
        media.type = MediaType.VIDEO;
      }
      media.link = file.destination + '/' + file.filename;
      media.message = savedMessage;
      savedMedia = await this.mediaRepository.save(media);
      await this.messageRepository
        .createQueryBuilder()
        .update(Message)
        .set({ media: savedMedia })
        .where('id = :id', { id: savedMessage.id })
        .execute();
    }
    if (messageData.group) {
      // Message is for a group
      const group = await this.groupRepository.findOne({
        where: { id: messageData.group.id },
      });
      if (!group) {
        throw new Error('Group not found');
      }
      // Set the group in the message
      savedMessage.group = group;
      await this.messageRepository.save(savedMessage);
    }
    return this.messageRepository.findOne({
      where: { id: savedMessage.id },
      relations: ['sender', 'receiver','group', 'media'],
      select: {
        id: true,
        content: true,

        sender: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        receiver: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
        group: {
          id: true,
          name: true,
          avatar: true,
        },
        created_at: true,
      },
    });
  }

  async update(
    id: string,
    user_id: string,
    messageData: Partial<Message>,
  ): Promise<Message> {
    const message = await this.messageRepository.findOneBy({ id });
    if (message.sender.id !== user_id) {
      throw new Error('You are not the sender of this message');
    }
    await this.messageRepository.update(id, messageData);
    return this.messageRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
