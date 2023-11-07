import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Media } from 'src/media/entities/media.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateMessageDto {
  @ApiProperty()
  group_id: string;

  @ApiProperty()
  receiver_id: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  media: Media;
}
