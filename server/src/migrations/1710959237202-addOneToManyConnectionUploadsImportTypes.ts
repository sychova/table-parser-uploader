import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOneToManyConnectionUploadsImportTypes1710959237202 implements MigrationInterface {
    name = 'AddOneToManyConnectionUploadsImportTypes1710959237202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "import_type" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_381c173d20042c50f3efda0cc8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "uploads_log" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, "size" integer, "format" character varying, "importTypeId" integer, CONSTRAINT "PK_e9302ae1184a69092b43151862b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "uploads_log" ADD CONSTRAINT "FK_1ec3450e07f8edead242a6bcb1a" FOREIGN KEY ("importTypeId") REFERENCES "import_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log" DROP CONSTRAINT "FK_1ec3450e07f8edead242a6bcb1a"`);
        await queryRunner.query(`DROP TABLE "uploads_log"`);
        await queryRunner.query(`DROP TABLE "import_type"`);
    }

}
