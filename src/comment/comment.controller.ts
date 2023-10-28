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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilterCommentDto } from './dto/filter-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config';
import { extname } from 'path';

@ApiTags('Comment')
@Controller('api/v1/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  findAll(@Query() query: FilterCommentDto) {
    return this.commentService.findAll(query);
  }

  @Get('post/:post_id')
  findAllByPost(@Param('post_id') post_id: string): Promise<Comment[]> {
    return this.commentService.findAllByPost(post_id);
  }

  @Get('user/:user_id')
  findAllByUser(@Param('user_id') user_id: string): Promise<Comment[]> {
    return this.commentService.findAllByUser(user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('media', {
      storage: storageConfig('media'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedImageExtArr = ['.jpg', '.png', '.jpeg'];
        const allowedVideoExtArr = ['.mp4', '.avi', '.mkv'];
        if (
          !allowedImageExtArr.includes(ext) &&
          !allowedVideoExtArr.includes(ext)
        ) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedImageExtArr
            .concat(allowedVideoExtArr)
            .toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5 && allowedImageExtArr.includes(ext)) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else if (
            fileSize > 1024 * 1024 * 50 &&
            allowedVideoExtArr.includes(ext)
          ) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 50 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  create(
    @Req() req: any,
    @Body() commentData: Partial<Comment>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    commentData.user = req.user_data;
    if (req.body.parent_comment_id)
      commentData.repliedComment = req.body.parent_comment_id || null;
    return this.commentService.create( req.body.post_id,commentData, file);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('media', {
      storage: storageConfig('media'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedImageExtArr = ['.jpg', '.png', '.jpeg'];
        const allowedVideoExtArr = ['.mp4', '.avi', '.mkv'];
        if (
          !allowedImageExtArr.includes(ext) &&
          !allowedVideoExtArr.includes(ext)
        ) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedImageExtArr
            .concat(allowedVideoExtArr)
            .toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5 && allowedImageExtArr.includes(ext)) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else if (
            fileSize > 1024 * 1024 * 50 &&
            allowedVideoExtArr.includes(ext)
          ) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 50 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() commentData: Partial<Comment>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Comment> {
    return this.commentService.update(id, req.user_data.id, commentData, file);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.commentService.remove(id);
  }
}
