import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '@/infra/typeorm/entities';
import { AdminModule } from '../admin/admin.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    AdminModule,
    AddressModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
