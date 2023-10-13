import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dataSourceOptions), AuthModule, PostModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
