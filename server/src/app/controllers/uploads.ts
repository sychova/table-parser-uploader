import { Request, Response } from "express";

import { ImportType, ImportTypeActions, UploadsLog } from "../entities";
import { uploadsService } from "../services";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  ImportTypeActionsDimensionCoordinatesSeed,
  ImportTypeDimensionCoordinatesSeed,
} from "../../migrations/seeds/importTypeDimensionCoordinates.seed";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const importTypeRepo: Repository<ImportType> =
      AppDataSource.getRepository(ImportType);

    // const importTypeActionsRepo: Repository<ImportTypeActions> =
    //   AppDataSource.getRepository(ImportTypeActions);

    // const eee = await AppDataSource.getRepository("import_type_actions").save(
    //   ImportTypeActionsDimensionCoordinatesSeed
    // );

    // console.log("eee", eee);

    // const yyy = await AppDataSource.getRepository("import_type").save(
    //   ImportTypeDimensionCoordinatesSeed
    // );

    // console.log("yyy", yyy);

    const importTypeRepoqqq = async () => {
      const rrr = await importTypeRepo.find({ relations: { actions: true } });

      console.log("importTypeRepoqqq", rrr);
    };

    await importTypeRepoqqq();

    // const importTypeActionsRepoqqq = async () => {
    //   const rrr = await importTypeActionsRepo.find({
    //     relations: { importType: true },
    //   });

    //   console.log("importTypeActionsRepoqqq", rrr);
    // };

    // await importTypeActionsRepoqqq();

    const uploads: UploadsLog[] = await uploadsService.getAll();

    res.json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const upload: UploadsLog = await uploadsService.create({
      name: req.file?.originalname,
      size: req.file?.size,
      format: req.file?.originalname.slice(
        req.file?.originalname.lastIndexOf(".")
      ),
    });

    res.json(upload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAll, create };
