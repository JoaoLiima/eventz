import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCpfError extends HttpException {
  constructor(cpf: string) {
    super(
      { message: `CPF ${cpf} is not valid`, code: 'INVALID_CPF' },
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'InvalidParamError';
  }
}
