import { CsvService } from './csv.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [CsvService],
  exports: [CsvService],
})
export class CsvModule {}
