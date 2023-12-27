import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './message/message.module';
import { MediaModule } from './media/media.module';
import { GroupModule } from './group/group.module';
import { TagModule } from './tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import { RelationshipModule } from './relationship/relationship.module';
import { PetModule } from './pet/pet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    MessageModule,
    MediaModule,
    TagModule,
    GroupModule,
    RelationshipModule,
    PetModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
