import { PointService } from './point.service';
import { PointRepository } from './point.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PointRepository])],
  controllers: [],
  providers: [PointService],
  exports: [PointService]
})
export class PointModule {}
