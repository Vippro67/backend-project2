import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilterCommentDto } from './dto/filter-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('Comment')
@Controller('api/v1/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  findAll(@Query() query: FilterCommentDto) {
    return this.commentService.findAll(query);
  }

  @Get('post/:post_id')
  findAllByPost(@Param('post_id') post_id: number): Promise<Comment[]> {
    return this.commentService.findAllByPost(post_id);
  }

  @Get('user/:user_id')
  findAllByUser(@Param('user_id') user_id: number): Promise<Comment[]> {
    return this.commentService.findAllByUser(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Req() req: any,
    @Body() commentData: CreateCommentDto,
  ): Promise<Comment> {
    commentData.user_id = req.user_data.id;
    commentData.post_id = req.body.post_id;
    // commentData.parentComment = req.body.parent_comment_id || null;
    return this.commentService.create(commentData);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Req() req: any,
    @Param('id') id: number,
    @Body() commentData: Partial<Comment>,
  ): Promise<Comment> {
    return this.commentService.update(id, req.user_data.id, commentData);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.commentService.remove(id);
  }
}
