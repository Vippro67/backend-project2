import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()

  @IsNotEmpty()
  password: string;
  @ApiProperty()

  first_name: string;
  @ApiProperty()
  last_name: string;

  @ApiProperty()
  status: number;
}
