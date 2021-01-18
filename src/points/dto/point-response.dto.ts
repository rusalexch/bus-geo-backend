import { ApiProperty } from '@nestjs/swagger';
import { Point } from '../entities/point.entity';

export class PointResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ description: 'Широта' })
  lat: number;

  @ApiProperty({ description: 'Долгота' })
  lon: number;

  // @ApiProperty()
  // speed: number;

  // @ApiProperty()
  // timestamp: Date;

  // @ApiProperty()
  // direction: number;

  // @ApiProperty()
  // distance: number;

  constructor(entity: Point) {
    this.id = entity.id;
    this.lat = entity.lat;
    this.lon = entity.lon;
    // this.speed = entity.speed;
    // this.timestamp = entity.device_timestamp;
    // this.direction = entity.direction;
  }
}
