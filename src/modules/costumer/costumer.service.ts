import {
  Costumer,
  CreateCostumer,
  PaginatedCostumer,
  UpdateCostumer,
} from '@/common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostumerEntity } from '@/infra/typeorm/entities';
import { Repository } from 'typeorm';
import { ValidateService } from '@/common/validate/validate.service';
import { NotFoundError } from '@/error';
import { UserService } from '../user/user.service';
import { arrayCostumerAdapter, costumerAdapter } from './costumer.adapter';
import { Role } from '@/common/enums';

@Injectable()
export class CostumerService {
  constructor(
    @InjectRepository(CostumerEntity)
    private costumerRepository: Repository<CostumerEntity>,
    private validateService: ValidateService,
    private userService: UserService,
  ) {}

  async create(costumer: CreateCostumer): Promise<Costumer> {
    await this.validateService.costumerExists(costumer);

    const user = await this.userService.create({
      ...costumer.user,
      role: Role.COSTUMER,
    });
    const createdCostumer = await this.costumerRepository.save({
      ...costumer,
      user: {
        ...user,
      },
    });

    return costumerAdapter(createdCostumer);
  }

  async find(pageNumber = 1, pageSize = 10): Promise<PaginatedCostumer> {
    const [result, total] = await this.costumerRepository.findAndCount({
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      relations: ['user'],
    });

    return {
      data: arrayCostumerAdapter(result),
      total,
    };
  }

  async findById(id: number): Promise<Costumer> {
    const costumer = await this.costumerRepository.findOne({
      relations: ['user'],
      where: { costumerId: id },
    });

    if (!costumer) throw new NotFoundError('costumer not found');

    return costumerAdapter(costumer);
  }

  async findByEmail(email: string): Promise<Costumer> {
    const costumer = await this.costumerRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          email: email,
        },
      },
    });

    if (!costumer) throw new NotFoundError('costumer not found');

    return costumerAdapter(costumer);
  }

  async findByPhone(phone: string): Promise<Costumer> {
    const costumer = await this.costumerRepository.findOne({
      relations: ['user'],
      where: {
        user: {
          phone: phone,
        },
      },
    });

    if (!costumer) throw new NotFoundError('costumer not found');

    return costumerAdapter(costumer);
  }

  async update(data: UpdateCostumer): Promise<Costumer> {
    await this.validateService.userExists(data.user);

    const costumer = await this.costumerRepository.findOne({
      relations: ['user'],
      where: {
        costumerId: data.costumerId,
      },
    });

    if (!costumer) throw new NotFoundError('costumer not found');

    const user = await this.userService.update(costumer.user, data.user);
    costumer.user = user;

    return costumerAdapter(costumer);
  }

  async delete(id: number): Promise<{ message: string }> {
    const costumer = await this.findById(id);

    if (!costumer) throw new NotFoundError('costumer not found');

    const deletedCostumer = await this.userService.delete(costumer.user);
    if (deletedCostumer) return { message: 'Costumer deleted successfully' };
  }
}
