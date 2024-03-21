import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOneToManyConnectionImportTypeActions1711028052265 implements MigrationInterface {
    name = 'AddOneToManyConnectionImportTypeActions1711028052265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "import_type_actions" ADD "importTypeId" integer`);
        await queryRunner.query(`ALTER TABLE "import_type_actions" ADD CONSTRAINT "FK_dd28a169e91994255a0dc8110f1" FOREIGN KEY ("importTypeId") REFERENCES "import_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "import_type_actions" DROP CONSTRAINT "FK_dd28a169e91994255a0dc8110f1"`);
        await queryRunner.query(`ALTER TABLE "import_type_actions" DROP COLUMN "importTypeId"`);
    }

}
