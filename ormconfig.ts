import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const TypeOrmConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: +process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'firefly',
  database: process.env.MYSQL_DATABASE || 'eventz',
  synchronize: false,
  autoLoadEntities: false,
  logging: false,
  entities: [__dirname + '/src/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/src/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: __dirname + '/src/infra/typeorm/migrations/',
  },
};

export default TypeOrmConfig;
