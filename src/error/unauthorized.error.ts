import { DefaultError } from '@/error/default.error';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends DefaultError {
  constructor(message?: string, error = new Error()) {
    super(error, message, 'UNAUTHORIZED_ERROR', HttpStatus.UNAUTHORIZED);
  }
}
