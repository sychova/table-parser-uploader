import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImportTypeTable1710958716459 implements MigrationInterface {
    name = 'AddImportTypeTable1710958716459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "uploads_log" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, "size" integer, "format" character varying, CONSTRAINT "PK_e9302ae1184a69092b43151862b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "import_type" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_381c173d20042c50f3efda0cc8a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "import_type"`);
        await queryRunner.query(`DROP TABLE "uploads_log"`);
    }

}
