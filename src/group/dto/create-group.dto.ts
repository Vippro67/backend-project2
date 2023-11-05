import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Media } from 'src/media/entities/media.entity';

export class CreateGrouptDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

}
