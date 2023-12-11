import { ApiProperty } from '@nestjs/swagger';

export class FilterGroupDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  items_per_page: number;
  @ApiProperty()
  search: string;
}
