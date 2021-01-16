import { GPSPointDto } from './../upload/dto/gps.point.dto';
import { Injectable } from '@nestjs/common';
import { Point } from './entities/point.entity';
import { PointRepository } from './point.repository';
import { Bus } from 'src/bus/entities/bus.entity';

@Injectable()
export class PointService {
  constructor(private pointRepository: PointRepository) {}

  async addPoints(points: GPSPointDto[]) {
    const pointEntities = points.map(
      (point) =>
        new Point({
          bus: new Bus({ ident: point.bus.ident, id: point.bus.id }),
          lat: point.lat,
          lon: point.lon,
          direction: point.direction,
          speed: point.speed,
          server_timestamp: point.server_timestamp,
          device_timestamp: point.device_timestamp,
        }),
    );
    return (
      await this.pointRepository.insert(pointEntities)
    ).identifiers.map<number>((item) => item.id);
  }
}
