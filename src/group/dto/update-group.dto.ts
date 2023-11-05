import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Media } from 'src/media/entities/media.entity';

export class UpdateGrouptDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

}
