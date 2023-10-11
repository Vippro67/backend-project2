import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  firstName: string;

  lastName: string;

  status: number;
}
