import { ApiProperty } from '@nestjs/swagger';

export class BoundsDto {
  @ApiProperty({ description: 'Минимальная широта' })
  minLat: number;

  @ApiProperty({ description: 'Максимальная широта' })
  maxLat: number;

  @ApiProperty({ description: 'Минимальная долгота' })
  minLng: number;

  @ApiProperty({ description: 'Максимальная долгота' })
  maxLng: number;
}
