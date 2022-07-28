import { CostumerEntity } from '@/infra/typeorm/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';

@Module({
  imports: [TypeOrmModule.forFeature([CostumerEntity]), UserModule],
  providers: [CostumerService],
  controllers: [CostumerController],
  exports: [CostumerService],
})
export class CostumerModule {}
