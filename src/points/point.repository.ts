import { Point } from './entities/point.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Point)
export class PointRepository extends Repository<Point> {}
