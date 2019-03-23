import * as HttpStatus from 'http-status-codes';

export interface ErrorObject {
  status: string;
  message: string;
}

export default class Error {
  private status: number;
  private msg: string;

  constructor(httpStatus: number, message: string) {
    this.status = httpStatus;
    this.msg = message;
  }

  getStatusCode(): number {
    return this.status;
  }
  getStatusText(): string {
    return HttpStatus.getStatusText(this.status);
  }
  getMessage(): string {
    return this.msg;
  }

  getErrorObject(): ErrorObject {
    return {
      status: this.getStatusText(),
      message: this.getMessage()
    };
  }
}
