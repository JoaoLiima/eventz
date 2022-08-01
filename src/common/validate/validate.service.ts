import {
  CpfInUseError,
  EmailInUseError,
  InvalidEmailError,
  PhoneInUseError,
} from '@/error';
import { UserService } from '@/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { CreateAdmin, CreateCostumer, User } from '@/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { CostumerEntity } from '@/infra/typeorm/entities';
import { Repository } from 'typeorm';
import { InvalidCpfError } from '@/error/invalid-cpf.error';

@Injectable()
export class ValidateService {
  constructor(
    private userService: UserService,
    @InjectRepository(CostumerEntity)
    private costumerRepository: Repository<CostumerEntity>,
  ) {}

  async adminExists({ user }: CreateAdmin) {
    await this.userExists(user);
  }

  async costumerExists(costumer: CreateCostumer) {
    const { cpf } = costumer;
    const { user } = costumer;

    if (!this.validateCpf(cpf)) throw new InvalidCpfError(cpf);
    await this.userExists(user);

    const costumerExists = await this.costumerRepository.count({ cpf });
    if (costumerExists) throw new CpfInUseError(cpf);
  }

  async userExists(user: Partial<User>) {
    const { email, phone } = user;

    if (email) {
      this.validateEmail(email);

      const emailExists = await this.userService.emailExists(email);
      if (emailExists) throw new EmailInUseError(email);
    }
    if (phone) {
      const phoneExists = await this.userService.phoneExists(phone);
      if (phoneExists) throw new PhoneInUseError(phone);
    }
  }

  private validateEmail(email: string) {
    const regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

    if (!regex.test(email)) {
      throw new InvalidEmailError(email);
    }
  }

  private validateCpf(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return false;

    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  }
}
