import { Injectable } from '@nestjs/common';
import { parseFile, writeToPath } from 'fast-csv';
import { Observable } from 'rxjs';

@Injectable()
export class CsvService {
  async getHeaders(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      parseFile(path, { headers: true })
        .on('headers', (headers: string[]) => resolve(headers))
        .on('error', reject);
    });
  }

  parse<T>(path: string) {
    return new Observable<T>((observer) => {
      parseFile(path, { headers: true })
        .on('data', (data) => observer.next(data))
        .on('error', (err) => observer.error(err))
        .on('end', () => observer.complete());
    });
  }

  save(path: string, rows: string[][]) {

  }
}
