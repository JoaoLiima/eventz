import { ValidateModule } from '@/common/validate/validate.module';
import { CostumerEntity, WalletEntity } from '@/infra/typeorm/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostumerEntity, WalletEntity]),
    UserModule,
    ValidateModule,
  ],
  providers: [CostumerService],
  controllers: [CostumerController],
  exports: [CostumerService],
})
export class CostumerModule {}
