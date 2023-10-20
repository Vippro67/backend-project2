import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Message } from './entities/message.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Message]),ConfigModule],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
