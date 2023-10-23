import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
   constructor(
    @InjectRepository(Message)
    private readonly messsageRepository: Repository<Message>,
  ) {}
  findAll() {
    return this.messsageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver'],
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
        created_at: true,
      },
    });
  }
  findOne(id: number) {
    return this.messsageRepository.findOne({
      where: { id },
      relations: ['sender', 'receiver'],
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
  findAllBySender(sender_id: number) {
    return this.messsageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver'],
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
        content: true,
        created_at: true,
      },
    });
  }
  findAllByReceiver(receiver_id: number) {
    return this.messsageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver'],
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
        created_at: true,
      },
    });
  }
  findMyMessagesTo(id: any, receiver_id: number) {
    return this.messsageRepository.find({
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
  getConversation(id: any, user_id: number): Promise<Message[]> {
    return this.messsageRepository.find({
      order: { created_at: 'DESC' },
      relations: ['sender', 'receiver'],
      where: {
        sender: {
          id: id || user_id,
        },
        receiver: {
          id: user_id || id,
        },
      } , 
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

  async create(messageData: Partial<Message>): Promise<Message> {
    const message = await this.messsageRepository.create(messageData);
    await this.messsageRepository.save(message);
    return message;
  }

  async update(
    id: number,
    user_id: number,
    messageData: Partial<Message>,
  ): Promise<Message> {
    const message = await this.messsageRepository.findOneBy({ id });
    if (message.sender.id !== user_id) {
      throw new Error('You are not the sender of this message');
    }
    await this.messsageRepository.update(id, messageData);
    return this.messsageRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.messsageRepository.delete(id);
  }


}
