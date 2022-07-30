import { Injectable } from '@nestjs/common';
import { CredentialEntity, UserEntity } from '@/infra/typeorm/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestError } from '@/error';
import { CreateUser, UpdateUser, User } from '@/common/interfaces';
import { mergeUsers } from './user.adapter';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(CredentialEntity)
    private credentialRepository: Repository<CredentialEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      relations: ['credential'],
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestError('invalid email or password');

    return user;
  }

  async create(user: CreateUser): Promise<User> {
    const createdUser = this.userRepository.create({
      ...user,
    });
    return await this.userRepository.save(createdUser);
  }

  async emailExists(email: string): Promise<boolean> {
    const emailExists = await this.userRepository.findOne({
      where: { email },
    });

    return emailExists ? true : false;
  }

  async phoneExists(phone: string): Promise<boolean> {
    const phoneExists = await this.userRepository.findOne({
      where: { phone },
    });

    return phoneExists ? true : false;
  }

  async delete(user: UserEntity) {
    try {
      return await this.userRepository.remove(user);
    } catch (err) {
      throw new BadRequestError('Error when deleting user');
    }
  }

  async update(
    currentUser: UserEntity,
    updatedUser: UpdateUser,
  ): Promise<User> {
    await this.userRepository.save(mergeUsers(currentUser, updatedUser));
    const user = await this.userRepository.findOne({
      userId: currentUser.userId,
    });

    return user;
  }
}
