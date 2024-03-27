import { MigrationInterface, QueryRunner } from "typeorm";

export class ReworkEntitiesRelations1711546725096 implements MigrationInterface {
    name = 'ReworkEntitiesRelations1711546725096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dimension_coordinates" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "x" integer NOT NULL, "y" integer NOT NULL, "z" integer NOT NULL, "importDataId" integer, CONSTRAINT "PK_086d19f70a27a30ac31cca12062" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "uploads_log_actions_params" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "params" character varying NOT NULL, "uploadId" integer, "actionId" integer, CONSTRAINT "PK_b52093eabc7743fe996032890fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "dimension_coordinates" ADD CONSTRAINT "FK_ce1ec4597898d7dfb3947615492" FOREIGN KEY ("importDataId") REFERENCES "uploads_log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" ADD CONSTRAINT "FK_1960f754e60ad040f7e78740277" FOREIGN KEY ("uploadId") REFERENCES "uploads_log"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" ADD CONSTRAINT "FK_3608e96c59123eefee5436709bb" FOREIGN KEY ("actionId") REFERENCES "import_type_actions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" DROP CONSTRAINT "FK_3608e96c59123eefee5436709bb"`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" DROP CONSTRAINT "FK_1960f754e60ad040f7e78740277"`);
        await queryRunner.query(`ALTER TABLE "dimension_coordinates" DROP CONSTRAINT "FK_ce1ec4597898d7dfb3947615492"`);
        await queryRunner.query(`DROP TABLE "uploads_log_actions_params"`);
        await queryRunner.query(`DROP TABLE "dimension_coordinates"`);
    }

}
