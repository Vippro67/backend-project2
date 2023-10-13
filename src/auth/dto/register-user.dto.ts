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

  firstName: string;
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  status: number;
}
