import { UserEntity, CredentialEntity } from '@/infra/typeorm/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, CredentialEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
