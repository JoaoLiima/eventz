import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWallet1658964392060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'wallet',
        columns: [
          {
            name: 'wallet_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'balance',
            type: 'decimal(15,2)',
            isNullable: false,
            default: 0,
          },
          {
            name: 'costumer_id',
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
            columnNames: ['costumer_id'],
            referencedColumnNames: ['costumer_id'],
            referencedTableName: 'costumer',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wallet');
  }
}
