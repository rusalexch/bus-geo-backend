import { CsvModule } from './../common/csv/csv.module';
import { UploadModule } from './../upload/upload.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [CsvModule, UploadModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
