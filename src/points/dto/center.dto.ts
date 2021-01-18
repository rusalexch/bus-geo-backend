import { ApiProperty } from '@nestjs/swagger';

export class CenterDto {
  @ApiProperty({ description: 'Широта' })
  lat: number;

  @ApiProperty({ description: 'Долгота' })
  lon: number;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }
}
