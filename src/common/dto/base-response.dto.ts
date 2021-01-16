import { ResponseStatus } from '../enum/response-status.enum';

export class BaseResponseDto<Result> {
  status: ResponseStatus;
  message?: string[] | string;
  result?: Result;

  constructor(options?: Partial<BaseResponseDto<Result>>) {
    Object.assign(this, options);
  }

  addMessage(message: string) {
    if (!this.message) {
      this.message = message;
      return;
    }
    if (Array.isArray(this.message)) {
      this.message.push(message);
      return;
    }
    this.message = [this.message, message];
  }
}
