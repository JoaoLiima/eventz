import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCostumerEvent1659314715018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'costumer_event',
        columns: [
          {
            name: 'costumer_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'event_id',
            type: 'integer',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['costumer_id'],
            referencedColumnNames: ['costumer_id'],
            referencedTableName: 'costumer',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['event_id'],
            referencedColumnNames: ['event_id'],
            referencedTableName: 'event',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('costumer_event');
  }
}
