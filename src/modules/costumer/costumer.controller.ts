import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CostumerService } from '@/modules/costumer/costumer.service';
import { CreateCostumer, UpdateCostumer } from '@/common/interfaces';

@Controller('costumer')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @Post()
  async createCostumer(@Body() data: CreateCostumer) {
    return this.costumerService.create(data);
  }

  @Get()
  async findAllCostumers(
    @Query('pageNumber') pageNumber,
    @Query('pageSize') pageSize,
  ) {
    return this.costumerService.find(pageNumber, pageSize);
  }

  @Get('by-email')
  async findByEmail(@Query('email') email: string) {
    return this.costumerService.findByEmail(email);
  }

  @Get('by-phone')
  async findByPhone(@Query('phone') phone: string) {
    return this.costumerService.findByPhone(phone);
  }

  @Patch()
  async update(@Body() data: UpdateCostumer) {
    return this.costumerService.update(data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.costumerService.delete(+id);
  }
}
