import { MigrationInterface, QueryRunner } from "typeorm";
import {
  ImportTypeDimensionCoordinatesSeed,
  ImportTypeActionsDimensionCoordinatesSeed,
} from "./seeds/importTypeDimensionCoordinates.seed";
import { ImportType, ImportTypeActions } from "../app/entities";

export class SeedImportTypes1711457333537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(ImportType)
      .values([{ name: ImportTypeDimensionCoordinatesSeed }])
      .execute();

    const importTypeId = (
      await queryRunner.manager
        .createQueryBuilder()
        .select("id")
        .from(ImportType, "import_type")
        .where("import_type.name = :name", {
          name: ImportTypeDimensionCoordinatesSeed,
        })
        .getRawOne()
    ).id;

    await ImportTypeActionsDimensionCoordinatesSeed.forEach(async (elem) => {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(ImportTypeActions)
        .values([{ ...elem, importType: importTypeId }])
        .execute();
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
