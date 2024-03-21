import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOneToManyConnectionUploadsImportTypes1711019162292 implements MigrationInterface {
    name = 'AddOneToManyConnectionUploadsImportTypes1711019162292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log" ADD "importTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "uploads_log" ADD CONSTRAINT "FK_1ec3450e07f8edead242a6bcb1a" FOREIGN KEY ("importTypeId") REFERENCES "import_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log" DROP CONSTRAINT "FK_1ec3450e07f8edead242a6bcb1a"`);
        await queryRunner.query(`ALTER TABLE "uploads_log" DROP COLUMN "importTypeId"`);
    }

}
