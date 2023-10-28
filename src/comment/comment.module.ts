import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { ConfigModule } from '@nestjs/config';
import { Media } from 'src/media/entities/media.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Comment, Media]),ConfigModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
