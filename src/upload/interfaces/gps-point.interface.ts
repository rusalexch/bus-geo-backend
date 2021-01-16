export interface IGPSPoint {
  ident: string;
  lat: number;
  lon: number;
  speed: number;
  device_timestamp: Date;
  server_timestamp: Date;
  direction: number;
}
