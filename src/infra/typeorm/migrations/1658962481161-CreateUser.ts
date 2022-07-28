import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1658962481161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'user_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '255',
          },
          {
            name: 'last_name',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '30',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
            length: '30',
          },
          {
            default: 'now()',
            name: 'created_at',
            type: 'timestamp',
          },
          {
            default: 'now()',
            name: 'updated_at',
            type: 'timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
