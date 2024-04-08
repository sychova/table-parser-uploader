import { Request, Response } from "express";

import { UploadsLog } from "../entities";
import { parsingService, uploadsService } from "../services";

const ALLOWED_EXTENSIONS = [".csv", ".xls", ".xlsx"];

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const uploads: UploadsLog[] = await uploadsService.getAll();

    res.json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const createCSV = async () => {};

// const createXLSX = async () => {};

const create = async (req: Request, res: Response) => {
  try {
    const fileExtension = req.file?.originalname.slice(
      req.file?.originalname.lastIndexOf(".")
    ) as string;

    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      res.json({ error: "File format not supported" });
    }

    const parsedFile: any = await parsingService.parse(req.file);

    const upload: any = await uploadsService.create({
      name: req.file?.originalname,
      size: req.file?.size,
      format: req.file?.originalname.slice(
        req.file?.originalname.lastIndexOf(".")
      ),
      path: `${req.file?.destination}/${req.file?.originalname}`,
      importType: 1,
    });

    await parsingService.saveData(upload.id, parsedFile.data);

    if (fileExtension === ".csv") {
      const actionParamSets = JSON.parse(req.body.actionParamSets);

      await parsingService.saveActions(
        upload.id,
        fileExtension,
        actionParamSets
      );
    }

    if ([".xls", ".xlsx"].includes(fileExtension)) {
      await parsingService.saveActions(
        upload.id,
        fileExtension,
        parsedFile.actions
      );
    }

    const newFullUpload = await uploadsService.getById(upload.id);

    res.json(newFullUpload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProcessedData = (id: string) => {};

export { getAll, create, getProcessedData };
