import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManyToManyConnectionUploadActions1711028138454 implements MigrationInterface {
    name = 'AddManyToManyConnectionUploadActions1711028138454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "uploads_log_actions_import_type_actions" ("uploadsLogId" integer NOT NULL, "importTypeActionsId" integer NOT NULL, CONSTRAINT "PK_b51a4b179c891654a228f2a8afb" PRIMARY KEY ("uploadsLogId", "importTypeActionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d957cdb781af2c1056fde37af" ON "uploads_log_actions_import_type_actions" ("uploadsLogId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5bb44277d4dca9308149a2cc39" ON "uploads_log_actions_import_type_actions" ("importTypeActionsId") `);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_import_type_actions" ADD CONSTRAINT "FK_5d957cdb781af2c1056fde37afa" FOREIGN KEY ("uploadsLogId") REFERENCES "uploads_log"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_import_type_actions" ADD CONSTRAINT "FK_5bb44277d4dca9308149a2cc39f" FOREIGN KEY ("importTypeActionsId") REFERENCES "import_type_actions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_import_type_actions" DROP CONSTRAINT "FK_5bb44277d4dca9308149a2cc39f"`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_import_type_actions" DROP CONSTRAINT "FK_5d957cdb781af2c1056fde37afa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5bb44277d4dca9308149a2cc39"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d957cdb781af2c1056fde37af"`);
        await queryRunner.query(`DROP TABLE "uploads_log_actions_import_type_actions"`);
    }

}
