import { MigrationInterface, QueryRunner } from "typeorm";
import {
  ImportTypeDimensionCoordinatesSeed,
  ImportTypeActionsDimensionCoordinatesSeed,
} from "./seeds/importTypeDimensionCoordinates.seed";
import { AppDataSource } from "../data-source";
import { ImportType, ImportTypeActions } from "../app/entities";

export class SeedImportTypes1711457333537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
