import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManyToManyConnectionUploadActions1710959833955 implements MigrationInterface {
    name = 'AddManyToManyConnectionUploadActions1710959833955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "import_type_actions" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, "importTypeId" integer, CONSTRAINT "PK_414347aef66bc63d1cf12bf1a27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "import_type" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_381c173d20042c50f3efda0cc8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "uploads_log" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "name" character varying NOT NULL, "size" integer, "format" character varying, "importTypeId" integer, CONSTRAINT "PK_e9302ae1184a69092b43151862b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "uploads_log_actions_import_type_actions" ("uploadsLogId" integer NOT NULL, "importTypeActionsId" integer NOT NULL, CONSTRAINT "PK_b51a4b179c891654a228f2a8afb" PRIMARY KEY ("uploadsLogId", "importTypeActionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d957cdb781af2c1056fde37af" ON "uploads_log_actions_import_type_actions" ("uploadsLogId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5bb44277d4dca9308149a2cc39" ON "uploads_log_actions_import_type_actions" ("importTypeActionsId") `);
        await queryRunner.query(`ALTER TABLE "import_type_actions" ADD CONSTRAINT "FK_dd28a169e91994255a0dc8110f1" FOREIGN KEY ("importTypeId") REFERENCES "import_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uploads_log" ADD CONSTRAINT "FK_1ec3450e07f8edead242a6bcb1a" FOREIGN KEY ("importTypeId") REFERENCES "import_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_import_type_actions" ADD CONSTRAINT "FK_5d957cdb781af2c1056fde37afa" FOREIGN KEY ("uploadsLogId") REFERENCES "uploads_log"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_import_type_actions" ADD CONSTRAINT "FK_5bb44277d4dca9308149a2cc39f" FOREIGN KEY ("importTypeActionsId") REFERENCES "import_type_actions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_import_type_actions" DROP CONSTRAINT "FK_5bb44277d4dca9308149a2cc39f"`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_import_type_actions" DROP CONSTRAINT "FK_5d957cdb781af2c1056fde37afa"`);
        await queryRunner.query(`ALTER TABLE "uploads_log" DROP CONSTRAINT "FK_1ec3450e07f8edead242a6bcb1a"`);
        await queryRunner.query(`ALTER TABLE "import_type_actions" DROP CONSTRAINT "FK_dd28a169e91994255a0dc8110f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5bb44277d4dca9308149a2cc39"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d957cdb781af2c1056fde37af"`);
        await queryRunner.query(`DROP TABLE "uploads_log_actions_import_type_actions"`);
        await queryRunner.query(`DROP TABLE "uploads_log"`);
        await queryRunner.query(`DROP TABLE "import_type"`);
        await queryRunner.query(`DROP TABLE "import_type_actions"`);
    }

}
