import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  Req,
  UseGuards,
  Get,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Message } from './entities/message.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Message')
@Controller('api/v1/messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Get('sender/:sender_id')
  findAllBySender(@Param('sender_id') sender_id: number): Promise<Message[]> {
    return this.messageService.findAllBySender(sender_id);
  }

  @Get('receiver/:receiver_id')
  findAllByReceiver(
    @Param('receiver_id') receiver_id: number,
  ): Promise<Message[]> {
    return this.messageService.findAllByReceiver(receiver_id);
  }

  @UseGuards(AuthGuard)
  @Get('my-messages-to/:receiver_id')
  findMyMessagesTo(@Req() req: any, @Param('receiver_id') receiver_id: number) {
    return this.messageService.findMyMessagesTo(req.user_data.id, receiver_id);
  }

  @UseGuards(AuthGuard)
  @Get('conversation/user/:user_id')
  getConversation(
    @Req() req: any,
    @Param('user_id') user_id: number,
  ): Promise<Message[]> {
    return this.messageService.getConversation(req.user_data.id, user_id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Req() req: any,
    @Body() messageData: Partial<Message>,
  ): Promise<Message> {
    messageData.sender = req.user_data.id;
    messageData.receiver = req.body.receiver_id;
    messageData.content = req.body.content;
    return this.messageService.create(messageData);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Req() req: any,
    @Param('id') id: number,
    @Body() messageData: Partial<Message>,
  ): Promise<Message> {
    return this.messageService.update(id, req.user_data.id, messageData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.messageService.remove(id);
  }
}
