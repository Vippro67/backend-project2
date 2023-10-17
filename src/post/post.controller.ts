import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './entities/post.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'src/config';
import { extname } from 'path';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UpdateResult } from 'typeorm';
import { FilterPostDto } from './dto/filter-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('api/v1/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPost(@Query() filterquery: FilterPostDto) {
    return this.postService.findAll(filterquery);
  }

  @Get(':id')
  getPostById(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageConfig('image'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
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
    @UploadedFile() file: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
  ) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    } else if (file) {
      createPostDto.image = file.destination + '/' + file.filename;
    }
    return this.postService.create(req.user_data.id, createPostDto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storageConfig('image'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  update(
    @Param('id') id: number,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<UpdateResult> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    } else if (file) {
      updatePostDto.image = file.destination + '/' + file.filename;
    }
    return this.postService.update(id, req.user_data.id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove( @Req() req: any,@Param('id') id: number): Promise<void> {
    return this.postService.remove(id, req.user_data.id);
  }
}
