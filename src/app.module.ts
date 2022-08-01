import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfigFactory } from '@/config/typeormConfig.factory';
import { CostumerModule } from '@/modules/costumer/costumer.module';
import { AdminModule } from '@/modules/admin/admin.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { AddressModule } from '@/modules/address/address.module';
import { EventModule } from '@/modules/event/event.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { WalletModule } from './modules/wallet/wallet.module';
@Module({
  imports: [
    AddressModule,
    AdminModule,
    AuthModule,
    CostumerModule,
    EventModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => typeOrmConfigFactory(),
      inject: [ConfigService],
    }),
    PurchaseModule,
    WalletModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
