import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddress1658966802057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'address',
        columns: [
          {
            name: 'address_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'zipcode',
            type: 'integer',
          },
          {
            name: 'city',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'neighborhood',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'street',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'number',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
            length: '100',
          },
          {
            name: 'user_id',
            type: 'integer',
          },
          {
            name: 'event_id',
            type: 'integer',
            isUnique: true,
            isNullable: true,
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
    await queryRunner.dropTable('address');
  }
}
