import { ApiProperty } from '@nestjs/swagger';

export class FilterCommentDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  items_per_page: number;
  @ApiProperty()
  search: string;
}
