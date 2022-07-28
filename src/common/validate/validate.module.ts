import { CostumerEntity } from '@/infra/typeorm/entities';
import { UserModule } from '@/modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateService } from './validate.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([CostumerEntity])],
  providers: [ValidateService],
  exports: [ValidateService],
})
export class ValidateModule {}
