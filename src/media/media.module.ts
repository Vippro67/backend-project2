import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { Post } from 'src/post/entities/post.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/message/entities/message.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Media, Post,Comment,Message]),
    ConfigModule
  ],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
