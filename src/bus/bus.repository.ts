import { Bus } from './entities/bus.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Bus)
export class BusRepository extends Repository<Bus> {}
