import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterAddress1659199968917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('address');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('address', foreignKey);
    await queryRunner.dropColumn('address', 'user_id');

    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'costumer_id',
        type: 'integer',
        isUnique: true,
      }),
    );
    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['costumer_id'],
        referencedColumnNames: ['costumer_id'],
        referencedTableName: 'costumer',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.renameColumn('address', 'zipcode', 'zip_code');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('address');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('costumer_id') !== -1,
    );
    await queryRunner.dropForeignKey('address', foreignKey);
    await queryRunner.dropColumn('address', 'costumer_id');

    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'user_id',
        type: 'integer',
        isUnique: true,
      }),
    );
    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['user_id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.renameColumn('address', 'zip_code', 'zipcode');
  }
}
