import { BusDto } from './../../bus/dto/bus.dto';

export class GPSPointDto {
  lat: number;
  lon: number;
  speed: number;
  device_timestamp: Date;
  server_timestamp: Date;
  direction: number;
  bus: BusDto;

  constructor(options: Required<GPSPointDto>) {
    Object.assign(this, options);
  }
}
