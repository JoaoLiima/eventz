import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailInUseError extends HttpException {
  constructor(email: string) {
    super(
      { message: `Email ${email} already in use`, code: 'EMAIL_IN_USE' },
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'InvalidParamError';
  }
}
