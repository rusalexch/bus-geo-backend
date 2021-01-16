import { IUploadFileDto } from './../interfaces/file.interface copy';
import * as path from 'path';

export class UploadFileDto implements IUploadFileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;

  constructor(options: Required<IUploadFileDto>) {
    Object.assign(this, options);
  }

  get filePath() {
    return path.resolve(process.cwd(), this.destination, this.filename);
  }
}
