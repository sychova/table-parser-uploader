import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeParamType1712149268014 implements MigrationInterface {
    name = 'ChangeParamType1712149268014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" DROP COLUMN "params"`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" ADD "params" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" DROP COLUMN "params"`);
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" ADD "params" character varying NOT NULL`);
    }

}
