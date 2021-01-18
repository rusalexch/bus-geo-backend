import { BusService } from './bus.service';
import { Controller, Get } from '@nestjs/common';

@Controller('bus')
export class BusController {
  constructor(private busService: BusService) {}

  @Get()
  async list() {
    const [buses, count] = await this.busService.list();
    return { buses, count };
  }
}
