import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUser1659064150278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE user DROP COLUMN password`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE user ADD password varchar(100)`);
  }
}
