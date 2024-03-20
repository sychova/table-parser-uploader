import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSizeToUploadsLog1710958423745 implements MigrationInterface {
    name = 'AddSizeToUploadsLog1710958423745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "uploads_log" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, "size" integer, CONSTRAINT "PK_e9302ae1184a69092b43151862b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "uploads_log"`);
    }

}
