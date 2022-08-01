import { CostumerEntity, CostumerEventEntity } from '@/infra/typeorm/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerModule } from '../costumer/costumer.module';
import { EventModule } from '../event/event.module';
import { WalletModule } from '../wallet/wallet.module';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostumerEntity, CostumerEventEntity]),
    CostumerModule,
    EventModule,
    WalletModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
