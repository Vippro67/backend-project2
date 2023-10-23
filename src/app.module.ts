import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './follow/follow.module';
import { MessageModule } from './message/message.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dataSourceOptions), AuthModule, PostModule, CommentModule, FollowModule, MessageModule, MediaModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
