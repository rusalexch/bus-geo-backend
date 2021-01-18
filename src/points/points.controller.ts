import { PointService } from 'src/points/point.service';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('point')
export class PointsController {
  constructor(private pointService: PointService) {}

  @Get('dates/:busId')
  @ApiParam({ name: 'busId', required: true })
  async getDates(@Param('busId', ParseIntPipe) busId: number) {
    return await this.pointService.getDatesByBus(busId);
  }

  @Get(':busId')
  @ApiParam({ name: 'busId', required: true })
  @ApiQuery({ name: 'date', required: true, example: 'YYYY-MM-DD' })
  async getPoints(
    @Param('busId', ParseIntPipe) busId: number,
    @Query('date') date: string,
  ) {
    return await this.pointService.getPointsByBusAndDate(busId, date);
  }
}
