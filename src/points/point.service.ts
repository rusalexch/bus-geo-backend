import { CenterDto } from './dto/center.dto';
import { GPSPointDto } from './../upload/dto/gps.point.dto';
import { Injectable } from '@nestjs/common';
import { Point } from './entities/point.entity';
import { PointRepository } from './point.repository';
import { Bus } from 'src/bus/entities/bus.entity';
import { PointResponseDto } from './dto/point-response.dto';
import { ResponseDto } from './dto/response.dto';
import { getBounds, getCenter, getDistance } from 'geolib';
import { BoundsDto } from './dto/bounds.dto';

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

  async getDatesByBus(busId: number) {
    const result = await this.pointRepository.find({ busId });
    return result
      .map((point) => {
        const year = point.device_timestamp.getFullYear();
        const month = point.device_timestamp.getMonth();
        const day = point.device_timestamp.getDate();
        return `${year}-${month + 1}-${day}`;
      })
      .filter((date, idx, arr) => !arr.slice(0, idx).includes(date));
  }

  async getPointsByBusAndDate(busId: number, date: string) {
    const dateFrom = new Date(date);
    const dateTo = new Date(new Date(date).setDate(dateFrom.getDate() + 1));
    const [entities, countPoints] = await this.pointRepository
      .createQueryBuilder('point')
      .where({ busId })
      .andWhere(`point.device_timestamp > :dateFrom`, {
        dateFrom,
      })
      .andWhere(`point.device_timestamp < :dateTo`, {
        dateTo,
      })
      .orderBy('point.device_timestamp', 'DESC')
      .getManyAndCount();
    const points: PointResponseDto[] = [];
    let maxSpeed = 0;
    let distance = 0;

    entities.forEach((entity, idx) => {
      const point = new PointResponseDto(entity);
      if (entity.speed > maxSpeed) {
        maxSpeed = entity.speed;
      }
      if (idx) {
        const { lat: prevLat, lon: prevLon } = entities[idx - 1];
        const { lat, lon } = entity;
        distance += getDistance(
          { latitude: prevLat, longitude: prevLon },
          { latitude: lat, longitude: lon },
        );
      }
      points.push(point);
    });
    const coordinates = points.map((point) => ({
      latitude: point.lat,
      longitude: point.lon,
    }));
    let center = getCenter(coordinates);
    if (!center) {
      center = { latitude: 55.751574, longitude: 37.573856 }
    }
    const bounds = getBounds(coordinates) as BoundsDto;
    return new ResponseDto({
      points,
      countPoints,
      distance,
      maxSpeed,
      center: new CenterDto(center.latitude, center.longitude),
      bounds,
    });
  }
}
