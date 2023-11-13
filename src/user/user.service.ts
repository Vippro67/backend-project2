import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import * as AWS from 'aws-sdk';
import e from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  keyID: string = process.env.AWS_ACCESS_KEY_ID;
  keySecret: string = process.env.AWS_SECRET_ACCESS_KEY;
  region: string = process.env.AWS_REGION;
  bucketName: string = process.env.AWS_S3_BUCKET_NAME;

  s3 = new AWS.S3({
    accessKeyId: this.keyID,
    secretAccessKey: this.keySecret,
  });

  async getAllUser(filterquery: FilterUserDto) {
    const page = filterquery.page || 1;
    const items_per_page = filterquery.items_per_page || 10;
    const search = filterquery.search || '';
    const skip = items_per_page * (page - 1);
    const [res, total] = await this.userRepository.findAndCount({
      order: { created_at: 'DESC' },
      where: {
        first_name: Like(`%${search}%`),
        last_name: Like(`%${search}%`),
        email: Like(`%${search}%`),
      },
      take: items_per_page,
      skip: skip,
      select: [
        'id',
        'email',
        'first_name',
        'last_name',
        'avatar',
        'status',
        'created_at',
        'updated_at',
      ],
    });
    const totalPage = Math.ceil(total / items_per_page);
    const nextPage = Number(page) + 1 <= totalPage ? Number(page) + 1 : null;
    const prePage = Number(page) - 1 > 0 ? Number(page) - 1 : null;

    return {
      data: res,
      total,
      currentPage: page,
      items_per_page,
      totalPage,
      nextPage,
      prePage,
    };
  }
  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async updateAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<UpdateResult> {
    const params = {
      Bucket: this.bucketName,
      Key: `avatar/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', 
    };
    try {
      const result = await this.s3.upload(params).promise();
      return await this.userRepository.update(id, { avatar: result.Location });
    } catch (error) {
      throw new BadRequestException('Failed to upload avatar' + error);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
