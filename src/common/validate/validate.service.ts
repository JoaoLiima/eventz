import {
  CpfInUseError,
  EmailInUseError,
  InvalidEmailError,
  PhoneInUseError,
} from '@/error';
import { UserService } from '@/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { CreateCostumer, User } from '@/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { CostumerEntity } from '@/infra/typeorm/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ValidateService {
  constructor(
    private userService: UserService,
    @InjectRepository(CostumerEntity)
    private costumerRepository: Repository<CostumerEntity>,
  ) {}

  async costumerExists(costumer: CreateCostumer) {
    const { cpf } = costumer;
    const { user } = costumer;

    await this.userExists(user);

    const costumerExists = await this.costumerRepository.count({ cpf });
    if (costumerExists) throw new CpfInUseError(cpf);
  }

  async userExists(user: Partial<User>) {
    const { email, phone } = user;

    if (email) {
      this.isValidEmail(email);

      const emailExists = await this.userService.emailExists(email);
      if (emailExists) throw new EmailInUseError(email);
    }
    if (phone) {
      const phoneExists = await this.userService.phoneExists(phone);
      if (phoneExists) throw new PhoneInUseError(phone);
    }
  }

  isValidEmail(email: string) {
    const regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

    if (!regex.test(email)) {
      throw new InvalidEmailError(email);
    }
  }
}
