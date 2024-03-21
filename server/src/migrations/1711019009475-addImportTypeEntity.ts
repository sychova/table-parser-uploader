import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImportTypeEntity1711019009475 implements MigrationInterface {
    name = 'AddImportTypeEntity1711019009475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "import_type" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_381c173d20042c50f3efda0cc8a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "import_type"`);
    }

}
