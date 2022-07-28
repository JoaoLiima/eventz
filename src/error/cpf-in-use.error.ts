import { HttpException, HttpStatus } from '@nestjs/common';

export class CpfInUseError extends HttpException {
  constructor(cpf: string) {
    super(
      { message: `CPF ${cpf} already in use`, code: 'CPF_IN_USE' },
      HttpStatus.BAD_REQUEST,
    );
    this.name = 'InvalidParamError';
  }
}
