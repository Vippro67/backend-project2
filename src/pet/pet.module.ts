import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { User } from 'src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet,User]),ConfigModule],
  controllers: [PetController],
  providers: [PetService]
})
export class PetModule {}
