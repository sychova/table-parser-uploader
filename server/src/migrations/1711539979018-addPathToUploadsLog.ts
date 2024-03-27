import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPathToUploadsLog1711539979018 implements MigrationInterface {
    name = 'AddPathToUploadsLog1711539979018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log" ADD "path" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log" DROP COLUMN "path"`);
    }

}
