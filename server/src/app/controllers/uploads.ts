import { Request, Response } from "express";

import { UploadsLog } from "../entities";
import { parsingService, uploadsService } from "../services";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const uploads: UploadsLog[] = await uploadsService.getAll();

    res.json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    await parsingService.parse(req.file);
    // const parsingResult = await parsingService.parse(req.file);

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
