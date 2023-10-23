import { Injectable } from '@nestjs/common';
import { Media } from './entities/media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaType } from './enum/MediaType';

@Injectable()
export class MediaService {
}
