import { BadRequestException, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Media } from 'src/media/entities/media.entity';
import { User } from 'src/user/entities/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import * as AWS from 'aws-sdk';
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
  keyID: string = process.env.AWS_ACCESS_KEY_ID;
  keySecret: string = process.env.AWS_SECRET_ACCESS_KEY;
  region: string = process.env.AWS_REGION;
  bucketName: string = process.env.AWS_S3_BUCKET_NAME;

  s3 = new AWS.S3({
    accessKeyId: this.keyID,
    secretAccessKey: this.keySecret,
  });
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
  getClientName(id: string) {
    return this.messageRepository.findOne({
      where: { id },
      relations: ['sender'],
      select: {
        sender: {
          id: true,
          first_name: true,
          last_name: true,
        },
      },
    });
  }
  findOne(id: string) {
    return this.messageRepository.find({
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
  async getUserConversation(
    current_id: string,
    user_id: string,
  ): Promise<Message[]> {
    return this.messageRepository.find({
      order: { created_at: 'ASC' },
      relations: ['sender', 'receiver'],
      where: [
        { sender: { id: current_id }, receiver: { id: user_id } },
        { sender: { id: user_id }, receiver: { id: current_id } },
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
      },
    });
  }

  async getAllUserConversation(id: any): Promise<Message[]> {
    //get user group conversations
    const userGroups = await this.groupRepository.find({
      where: { users: { id: id } },
      relations: ['users'],
    });
    const groupConversations = await this.messageRepository.find({
      where: userGroups.map((group) => ({
        group: { id: group.id },
      })),
      order: { created_at: 'DESC' },
      relations: ['sender', 'group', 'receiver'],
      select: {
        sender: {
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
    //get user direct conversations (not group)

    const userConversations = await this.messageRepository.find({
      where: [
        { sender: { id: id }, group: IsNull() },
        { receiver: { id: id }, group: IsNull() },
      ],
      order: { created_at: 'DESC' },
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
        content: true,
        created_at: true,
      },
    });

    //merge conversations

    const filteredUserConversations = userConversations.filter((message) => {
      //if have many messages between two users, get the last one
      const index = userConversations.findIndex(
        (item) =>
          (item.sender.id == message.sender.id &&
            item.receiver?.id == message.receiver?.id) ||
          (item.sender.id == message.receiver?.id &&
            item.receiver?.id == message.sender.id),
      );
      return userConversations.indexOf(message) == index;
    });
    const filteredGroupConversations = groupConversations.filter((message) => {
      //if have many messages between two users, get the last one
      const index = groupConversations.findIndex(
        (item) => item.group.id == message.group.id,
      );
      return groupConversations.indexOf(message) == index;
    });

    const conversations = [
      ...filteredUserConversations,
      ...filteredGroupConversations,
    ];

    return conversations;
  }

  getGroupConversation(id: any, group_id: string): Promise<Message[]> {
    //check if user is in the group
    const isUserInGroup = this.groupRepository.findOne({
      where: { id: group_id, users: { id: id } },
    });
    if (!isUserInGroup) {
      throw new Error('User not in group');
    }

    return this.messageRepository.find({
      order: { created_at: 'ASC' },
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
    createMessageDto: CreateMessageDto,
    file: Express.Multer.File,
  ): Promise<Message> {
    enum MediaType {
      IMAGE = 'image',
      VIDEO = 'video',
    }
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!user) {
      throw new Error('Sender not found');
    }
    const messageData = new Message();
    messageData.content = createMessageDto.content;
    messageData.sender = user;
    if (createMessageDto.receiver_id != undefined)
      messageData.receiver = await this.userRepository.findOne({
        where: { id: createMessageDto.receiver_id },
      });
    if (createMessageDto.group_id != undefined)
      messageData.group = await this.groupRepository.findOne({
        where: { id: createMessageDto.group_id },
      });
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
      const params = {
        Bucket: this.bucketName,
        Key: `message/${Date.now()}_${file.originalname}`,
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

    // socket.io

    return this.messageRepository.findOne({
      where: { id: savedMessage.id },
      relations: ['sender', 'receiver', 'group', 'media'],
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

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }
}
