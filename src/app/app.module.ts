import { CsvModule } from './../common/csv/csv.module';
import { UploadModule } from './../upload/upload.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CsvModule, UploadModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
