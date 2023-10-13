import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service'
import { Post as PostEntity } from './entities/post.entity';

@Controller('api/v1/posts')
export class PostController {
}
