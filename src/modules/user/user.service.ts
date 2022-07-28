import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/infra/typeorm/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUser } from '@/common/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async emailExists({ email }: CreateUser) {
    const emailExists = await this.userRepository.findOne({
      where: { email },
    });

    return emailExists ? true : false;
  }

  async phoneExists({ phone }: CreateUser) {
    const phoneExists = await this.userRepository.findOne({
      where: { phone },
    });

    return phoneExists ? true : false;
  }
}
