import { HttpException, HttpStatus } from '@nestjs/common';

export class PhoneInUseError extends HttpException {
  constructor(phone: string) {
    super(
      { message: `Phone ${phone} already in use`, code: 'PHONE_IN_USE' },
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'InvalidParamError';
  }
}
