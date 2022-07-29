import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCredential1659063799309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'credential',
        columns: [
          {
            name: 'credential_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
            length: '255',
          },
          {
            name: 'last_password',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'user_id',
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
    await queryRunner.dropTable('credential');
  }
}
