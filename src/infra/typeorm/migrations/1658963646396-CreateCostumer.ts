import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCostumer1658963646396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'costumer',
        columns: [
          {
            name: 'costumer_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'user_id',
            type: 'integer',
            isUnique: true,
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
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('costumer');
  }
}
