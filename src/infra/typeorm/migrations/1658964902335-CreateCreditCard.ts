import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCreditCard1658964902335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'credit_card',
        columns: [
          {
            name: 'credit_card_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'security_number',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'card_number',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'expiration',
            type: 'varchar',
            length: '25',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'nickname',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'wallet_id',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['wallet_id'],
            referencedColumnNames: ['wallet_id'],
            referencedTableName: 'wallet',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('credit_card');
  }
}
