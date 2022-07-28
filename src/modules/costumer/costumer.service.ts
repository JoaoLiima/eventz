import { CreateCostumer } from '@/common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CostumerEntity } from '@/infra/typeorm/entities';
import { Repository } from 'typeorm';
import { CryptoService } from '@/infra/crypto/crypto.service';
import { Role } from '@/common/enums';
import { ValidateService } from '@/common/validate/validate.service';

@Injectable()
export class CostumerService {
  constructor(
    @InjectRepository(CostumerEntity)
    private costumerRepository: Repository<CostumerEntity>,
    private validateService: ValidateService,
  ) {}

  async create(costumer: CreateCostumer) {
    const { user } = costumer;

    await this.validateService.costumerExists(costumer);

    const hashedPassword = await CryptoService.hash(user.password);
    user.password = hashedPassword;
    user.role = Role.COSTUMER;

    const createdCostumer = await this.costumerRepository.save({
      ...costumer,
      user: {
        ...user,
      },
    });

    return createdCostumer;
  }
}
