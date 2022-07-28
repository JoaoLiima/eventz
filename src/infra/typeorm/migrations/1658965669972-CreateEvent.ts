import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEvent1658965669972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          {
            name: 'event_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'integer',
            default: 0,
          },
          {
            name: 'created_by',
            type: 'integer',
            isNullable: false,
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
            columnNames: ['created_by'],
            referencedColumnNames: ['admin_id'],
            referencedTableName: 'admin',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('event');
  }
}
