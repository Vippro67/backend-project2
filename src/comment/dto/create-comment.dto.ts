import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  commnent: string;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  post_id: number;
  
  @ApiProperty()
  parent_comment_id: number;
}
