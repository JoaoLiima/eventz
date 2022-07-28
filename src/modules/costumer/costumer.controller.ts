import { Controller, Post, Body } from '@nestjs/common';
import { CostumerService } from '@/modules/costumer/costumer.service';
import { CreateCostumer } from '@/common/interfaces';

@Controller('costumer')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @Post()
  async createCostumer(@Body() data: CreateCostumer) {
    return this.costumerService.create(data);
  }
}
