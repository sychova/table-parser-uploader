import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSizeFormatToUploadsLog1711018885032 implements MigrationInterface {
    name = 'AddSizeFormatToUploadsLog1711018885032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log" ADD "size" integer`);
        await queryRunner.query(`ALTER TABLE "uploads_log" ADD "format" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log" DROP COLUMN "format"`);
        await queryRunner.query(`ALTER TABLE "uploads_log" DROP COLUMN "size"`);
    }

}
