import { IUploadFileDto } from './interfaces/file.interface copy';
import { UploadService } from './upload.service';
import { BaseResponseDto } from '../common/dto/base-response.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', { dest: './upload', preservePath: true }),
  )
  @ApiOkResponse({ type: BaseResponseDto })
  @HttpCode(200)
  async upload(@UploadedFile() file: IUploadFileDto) {
    return await this.uploadService.uploadFile(new UploadFileDto(file));
  }
}

// {
//   fieldname: 'file',
//   originalname: 'data.csv',
//   encoding: '7bit',
//   mimetype: 'text/csv',
//   destination: './upload',
//   filename: '2431bfd60f13fa9b714906d8cc63f3a3',
//   path: 'upload/2431bfd60f13fa9b714906d8cc63f3a3',
//   size: 40280127
// }
