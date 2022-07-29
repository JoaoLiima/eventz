import { Injectable } from '@nestjs/common';
import { CredentialEntity, UserEntity } from '@/infra/typeorm/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultError } from '@/error';
import { CreateUser, UpdateUser } from '@/common/interfaces';
import { Role } from '@/common/enums';
import { mergeUsers } from './user.adapter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CredentialEntity)
    private credentialRepository: Repository<CredentialEntity>,
  ) {}

  async create(user: CreateUser) {
    const createdUser = this.userRepository.create({
      ...user,
      role: Role.COSTUMER,
    });
    return await this.userRepository.save(createdUser);
  }

  async emailExists(email: string) {
    const emailExists = await this.userRepository.findOne({
      where: { email },
    });

    return emailExists ? true : false;
  }

  async phoneExists(phone: string) {
    const phoneExists = await this.userRepository.findOne({
      where: { phone },
    });

    return phoneExists ? true : false;
  }

  async delete(user: UserEntity) {
    try {
      return await this.userRepository.remove(user);
    } catch (err) {
      throw new DefaultError('Error when deleting user');
    }
  }

  async update(currentUser: UserEntity, updatedUser: UpdateUser) {
    await this.userRepository.save(mergeUsers(currentUser, updatedUser));
    const user = await this.userRepository.findOne({
      userId: currentUser.userId,
    });

    return user;
  }
}
