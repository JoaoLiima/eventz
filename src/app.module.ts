import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfigFactory } from '@/config/typeormConfig.factory';
import { CostumerModule } from '@/modules/costumer/costumer.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => typeOrmConfigFactory(),
      inject: [ConfigService],
    }),
    CostumerModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
