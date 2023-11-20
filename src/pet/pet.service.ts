import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}
  keyID: string = process.env.AWS_ACCESS_KEY_ID;
  keySecret: string = process.env.AWS_SECRET_ACCESS_KEY;
  region: string = process.env.AWS_REGION;
  bucketName: string = process.env.AWS_S3_BUCKET_NAME;

  s3 = new AWS.S3({
    accessKeyId: this.keyID,
    secretAccessKey: this.keySecret,
  });
  findAll() {
    return this.petRepository.find();
  }

  findOne(id: string) {
    return this.petRepository.findOne({ where: { id } });
  }

  findMyPets(userId: string) {
    return this.petRepository.find({
      where: {
        owner: {
          id: userId,
        },
      },
    });
  }

  remove(id: string) {
    return this.petRepository.delete({ id });
  }

  async create(
    userId: string,
    createPetDto: CreatePetDto,
    file: Express.Multer.File,
  ) {
    console.log('createPetDto', createPetDto);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    //save pet
    const pet = new Pet();
    pet.owner = user;
    pet.name = createPetDto.name;
    pet.species = createPetDto.species;
    pet.age = createPetDto.age;
    pet.breed = createPetDto.breed;
    pet.sex = createPetDto.sex;
    pet.description = createPetDto.description;
    if (file) {
      const params = {
        Bucket: this.bucketName,
        Key: `pet-avatar/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      try {
        const result = await this.s3.upload(params).promise();
        pet.avatar = result.Location;
      } catch (error) {
        throw new BadRequestException('Failed to upload avatar' + error);
      }
    }

    await this.petRepository.save(pet);
    return this.petRepository.findOne({
      where: { id: pet.id },
      relations: ['owner'],
      select: {
        owner: {
          id: true,
          first_name: true,
          last_name: true,
          avatar: true,
        },
      },
    });
  }

  async update(
    userId: string,
    petId: string,
    createPetDto: CreatePetDto,
    file: Express.Multer.File,
  ) {
    const pet = await this.petRepository.findOne({
      where: {
        id: petId,
        owner: {
          id: userId,
        },
      },
    });
    //save pet
    if (!pet) {
      return 'Pet not found';
    }
    pet.name = createPetDto.name;
    pet.species = createPetDto.species;
    pet.age = createPetDto.age;
    pet.breed = createPetDto.breed;
    pet.sex = createPetDto.sex;
    pet.description = createPetDto.description;
    if (file) {
      const params = {
        Bucket: this.bucketName,
        Key: `pet-avatar/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      try {
        const result = await this.s3.upload(params).promise();
        pet.avatar = result.Location;
      } catch (error) {
        throw new BadRequestException('Failed to upload avatar' + error);
      }
    }
    await this.petRepository.save(pet);
    return this.petRepository.findOne({ where: { id: petId } });
  }
}
