import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '@/infra/typeorm/entities';
import { Repository } from 'typeorm';
import { ValidateService } from '@/common/validate/validate.service';
import { NotFoundError } from '@/error';
import { UserService } from '@/modules/user/user.service';
import {
  Admin,
  CreateAdmin,
  PaginatedAdmin,
  UpdateAdmin,
} from '@/common/interfaces';
import { adminAdapter, arrayAdminAdapter } from './admin.adapter';
import { Role } from '@/common/enums';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    private validateService: ValidateService,
    private userService: UserService,
  ) {}

  async create(admin: CreateAdmin): Promise<Admin> {
    await this.validateService.adminExists(admin);

    const user = await this.userService.create({
      ...admin.user,
      role: Role.ADMIN,
    });
    const createdAdmin = await this.adminRepository.save({
      ...admin,
      user: {
        ...user,
      },
    });

    return adminAdapter(createdAdmin);
  }

  async find(pageNumber = 1, pageSize = 10): Promise<PaginatedAdmin> {
    const [result, total] = await this.adminRepository.findAndCount({
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      relations: ['user'],
    });

    return {
      data: arrayAdminAdapter(result),
      total,
    };
  }

  async findById(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      relations: ['user'],
      where: { adminId: id },
    });

    if (!admin) throw new NotFoundError('admin not found');

    return adminAdapter(admin);
  }

  async findByUserId(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          userId: id,
        },
      },
    });

    if (!admin) throw new NotFoundError('admin not found');

    return adminAdapter(admin);
  }

  async findByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          email: email,
        },
      },
    });

    if (!admin) throw new NotFoundError('admin not found');

    return adminAdapter(admin);
  }

  async findByPhone(phone: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          phone: phone,
        },
      },
    });

    if (!admin) throw new NotFoundError('admin not found');

    return adminAdapter(admin);
  }

  async update(data: UpdateAdmin): Promise<Admin> {
    await this.validateService.userExists(data.user);

    const admin = await this.adminRepository.findOne({
      relations: ['user'],
      where: {
        adminId: data.adminId,
      },
    });

    if (!admin) throw new NotFoundError('admin not found');

    const user = await this.userService.update(admin.user, data.user);
    admin.user = user;

    return adminAdapter(admin);
  }

  async delete(id: number): Promise<{ message: string }> {
    const admin = await this.findById(id);

    if (!admin) throw new NotFoundError('admin not found');

    const deletedAdmin = await this.userService.delete(admin.user);
    if (deletedAdmin) return { message: 'admin deleted successfully' };
  }
}
