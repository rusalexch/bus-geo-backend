import { BusService } from './bus.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusRepository } from './bus.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BusRepository])],
  controllers: [],
  providers: [BusService],
  exports: [BusService],
})
export class BusModule {}
