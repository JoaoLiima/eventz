import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterEvent1659284352733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'event',
      'price',
      new TableColumn({
        name: 'price',
        type: 'decimal(15,2)',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'event',
      'price',
      new TableColumn({
        name: 'price',
        type: 'integer',
        default: 0,
      }),
    );
  }
}
