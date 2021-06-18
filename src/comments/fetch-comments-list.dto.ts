import { ApiProperty } from '@nestjs/swagger';

export class FetchCommentsListDto {
  @ApiProperty()
  phrase: string;
}