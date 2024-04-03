import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeParamsColumnName1712152674336 implements MigrationInterface {
    name = 'ChangeParamsColumnName1712152674336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" RENAME COLUMN "params" TO "param"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads_log_actions_params" RENAME COLUMN "param" TO "params"`);
    }

}
