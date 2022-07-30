import { AddressEntity } from '@/infra/typeorm/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostumerModule } from '../costumer/costumer.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), CostumerModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
