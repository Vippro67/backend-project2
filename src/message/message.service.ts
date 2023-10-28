import { Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from 'src/media/entities/media.entity';
import { MediaType } from 'src/media/enum/MediaType';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messsageRepository: Repository<Message>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
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
  findOne(id: string) {
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
  findAllBySender(sender_id: string) {
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
  findAllByReceiver(receiver_id: string) {
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
  findMyMessagesTo(id: any, receiver_id: string) {
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
  getConversation(id: any, user_id: string): Promise<Message[]> {
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

  async create(
    messageData: Partial<Message>,
    file: Express.Multer.File,
  ): Promise<Message> {
    const savedMessage = await this.messsageRepository.save(messageData);
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
      await this.messsageRepository
        .createQueryBuilder()
        .update(Message) 
        .set({ media: savedMedia })
        .where('id = :id', { id: savedMessage.id })
        .execute();
    }
    return this.messsageRepository.findOne({
      where: { id: savedMessage.id },
      relations: ['sender', 'receiver', 'media'],
    });
  }

  async update(
    id: string,
    user_id: string,
    messageData: Partial<Message>,
  ): Promise<Message> {
    const message = await this.messsageRepository.findOneBy({ id });
    if (message.sender.id !== user_id) {
      throw new Error('You are not the sender of this message');
    }
    await this.messsageRepository.update(id, messageData);
    return this.messsageRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.messsageRepository.delete(id);
  }
}
