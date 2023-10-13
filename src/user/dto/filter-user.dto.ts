import { ApiProperty } from '@nestjs/swagger';

export class FilterUserDto {
  @ApiProperty()
  page: number;
  @ApiProperty()
  items_per_page: number;
  @ApiProperty()
  search: string;
}
