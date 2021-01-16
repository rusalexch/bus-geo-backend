import { CsvModule } from './../common/csv/csv.module';
import { UploadService } from './upload.service';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';

@Module({
  imports: [CsvModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
