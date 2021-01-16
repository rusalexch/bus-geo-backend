import { BusDto } from './dto/bus.dto';
import { Injectable } from '@nestjs/common';
import { BusRepository } from './bus.repository';
import { Bus } from './entities/bus.entity';

@Injectable()
export class BusService {
  constructor(private busRepository: BusRepository) {}

  async addBuses(buses: BusDto[]) {
    const busEntities = buses.map((bus) => new Bus({ ident: bus.ident }));
    return (
      await this.busRepository.insert(busEntities)
    ).identifiers.map<number>((item) => item.id);
  }
}
