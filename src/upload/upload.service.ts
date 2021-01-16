import { BusService } from './../bus/bus.service';
import { GPSPointDto } from './dto/gps.point.dto';
import { BusDto } from './../bus/dto/bus.dto';
import { IGPSPoint } from './interfaces/gps-point.interface';
import { requiredFields } from './constants/reauired-fields.const';
import { CsvService } from './../common/csv/csv.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { AvailableMimetypes } from 'src/common/enum/available-mimetypes.enum';
import { ResponseStatus } from 'src/common/enum/response-status.enum';
import { messages } from 'src/common/messages';
import { UploadFileDto } from './dto/upload-file.dto';
import { PointService } from 'src/points/point.service';

export type Test = { buses: BusDto[]; points: GPSPointDto[] };

@Injectable()
export class UploadService {
  constructor(
    private csvService: CsvService,
    private busService: BusService,
    private pointService: PointService,
  ) {}

  async uploadFile(file: UploadFileDto): Promise<BaseResponseDto<string>> {
    return new Promise(async (resolve) => {
      const response = new BaseResponseDto<string>();
      await this.validateFile(file, response);
      if (response.status === ResponseStatus.error) {
        this.deleteFile(file.filePath);
        resolve(response);
      }
      const buses: BusDto[] = [];
      const points: GPSPointDto[] = [];
      this.csvService.parse<IGPSPoint>(file.filePath).subscribe(
        (data: IGPSPoint) => {
          if (Object.values(data).every((value) => !!value)) {
            const {
              ident,
              lat,
              lon,
              device_timestamp,
              server_timestamp,
              speed,
              direction,
            } = data;
            let bus = buses.find((bus) => bus.ident === ident);
            if (!bus) {
              bus = new BusDto({ ident });
              buses.push(bus);
            }
            points.push(
              new GPSPointDto({
                bus,
                lat,
                lon,
                device_timestamp,
                server_timestamp,
                speed,
                direction,
              }),
            );
          }
        },
        (error: Error) => {
          console.error(error);
        },
        async () => {
          response.status = ResponseStatus.ok;
          response.result = messages.info.upload.uploadCompleted;
          const busIds = await this.busService.addBuses(buses);
          console.log(busIds);
          const pointEntities = points.map((point) => {
            const index = buses.findIndex((bus) => {
              return bus.ident === point.bus.ident;
            });
            point.bus.id = busIds[index];
            return point;
          });
          while (pointEntities.length) {
            console.log(pointEntities.length);
            await this.pointService.addPoints(pointEntities.splice(0, 1000));
          }
          this.deleteFile(file.filePath);
          resolve(response);
        },
      );
    });
  }

  async validateFile(file: UploadFileDto, response: BaseResponseDto<unknown>) {
    if (!this.isCsvFile(file)) {
      response.status = ResponseStatus.error;
      response.addMessage(messages.error.upload.uploadedFileIsNotAvailable);
      return;
    }
    if (!(await this.isFileHasRequiredField(file))) {
      response.status = ResponseStatus.error;
      response.addMessage(
        messages.error.upload.uploadedFileIsNotHaveRequiredHeaders,
      );
    }
  }

  async isFileHasRequiredField(file: UploadFileDto): Promise<boolean> {
    const headers = await this.csvService.getHeaders(file.filePath);
    return requiredFields.every((requiredField) => {
      return headers.includes(requiredField);
    });
  }

  isCsvFile(file: UploadFileDto): boolean {
    return AvailableMimetypes.scv === file.mimetype;
  }

  deleteFile(path: string) {
    try {
      fs.unlink(path, (error) => {
        if (error) {
          console.error(error);
        }
        console.info(`File ${path} deleted`);
      });
    } catch (error) {
      console.error(error);
    }
  }

  getFilePath(file: UploadFileDto): string {
    return path.resolve(process.cwd(), file.destination, file.filename);
  }
}
