import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { Post } from 'src/post/entities/post.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Media, Post]),
    ConfigModule
  ],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
