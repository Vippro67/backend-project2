import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  sex: string;

  @ApiProperty()
  @IsNotEmpty()
  species: string;

  @ApiProperty()
  @IsNotEmpty()
  breed: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  avatar: string;

}
