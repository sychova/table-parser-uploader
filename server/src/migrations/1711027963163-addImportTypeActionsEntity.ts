import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImportTypeActionsEntity1711027963163 implements MigrationInterface {
    name = 'AddImportTypeActionsEntity1711027963163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "import_type_actions" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_414347aef66bc63d1cf12bf1a27" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "import_type_actions"`);
    }

}
