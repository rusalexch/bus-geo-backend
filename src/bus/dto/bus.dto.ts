export class BusDto {
  id?: number;
  ident: string;

  constructor(options: Partial<BusDto>) {
    Object.assign(this, options);
  }
}
