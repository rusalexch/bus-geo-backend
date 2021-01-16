import { PointModule } from './../points/point.module';
import { BusModule } from './../bus/bus.module';
import { CsvModule } from './../common/csv/csv.module';
import { UploadService } from './upload.service';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
  imports: [CsvModule, BusModule, PointModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
