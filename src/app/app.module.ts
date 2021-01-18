import { PointsController } from './../points/points.controller';
import { PointModule } from './../points/point.module';
import { BusModule } from './../bus/bus.module';
import { CsvModule } from './../common/csv/csv.module';
import { UploadModule } from './../upload/upload.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PointModule,
    BusModule,
    CsvModule,
    UploadModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [PointsController, AppController],
  providers: [],
})
export class AppModule {}
