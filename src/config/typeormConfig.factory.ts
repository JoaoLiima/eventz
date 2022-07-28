import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import TypeOrmConfig from 'ormconfig';

export function typeOrmConfigFactory(): TypeOrmModuleOptions {
  return TypeOrmConfig;
}
