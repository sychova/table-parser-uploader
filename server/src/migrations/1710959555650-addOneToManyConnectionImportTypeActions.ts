import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOneToManyConnectionImportTypeActions1710959555650 implements MigrationInterface {
    name = 'AddOneToManyConnectionImportTypeActions1710959555650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "import_type_actions" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, "importTypeId" integer, CONSTRAINT "PK_414347aef66bc63d1cf12bf1a27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "import_type" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_381c173d20042c50f3efda0cc8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "uploads_log" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, "size" integer, "format" character varying, "importTypeId" integer, CONSTRAINT "PK_e9302ae1184a69092b43151862b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "import_type_actions" ADD CONSTRAINT "FK_dd28a169e91994255a0dc8110f1" FOREIGN KEY ("importTypeId") REFERENCES "import_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uploads_log" ADD CONSTRAINT "FK_1ec3450e07f8edead242a6bcb1a" FOREIGN KEY ("importTypeId") REFERENCES "import_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log" DROP CONSTRAINT "FK_1ec3450e07f8edead242a6bcb1a"`);
        await queryRunner.query(`ALTER TABLE "import_type_actions" DROP CONSTRAINT "FK_dd28a169e91994255a0dc8110f1"`);
        await queryRunner.query(`DROP TABLE "uploads_log"`);
        await queryRunner.query(`DROP TABLE "import_type"`);
        await queryRunner.query(`DROP TABLE "import_type_actions"`);
    }

}
