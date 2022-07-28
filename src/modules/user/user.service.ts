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

  async userExists(user: CreateUser) {
    const { email, phone } = user;
    const userExists = await this.userRepository.findOne({
      where: { email: user.email },
    });

    return userExists ? true : false;
  }
}
