import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEmailError extends HttpException {
  constructor(email: string) {
    super(
      { message: `Email ${email} is not valid`, code: 'INVALID_EMAIL' },
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'InvalidParamError';
  }
}
