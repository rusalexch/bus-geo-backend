import { BoundsDto } from './bounds.dto';
import { CenterDto } from './center.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PointResponseDto } from './point-response.dto';

export class ResponseDto {
  @ApiProperty()
  points: PointResponseDto[];

  @ApiProperty()
  countPoints: number;

  @ApiProperty()
  maxSpeed: number;

  @ApiProperty()
  distance: number;

  @ApiProperty()
  center: CenterDto;

  @ApiProperty()
  bounds: BoundsDto;

  constructor(options: Partial<ResponseDto>) {
    Object.assign(this, options);
  }
}
