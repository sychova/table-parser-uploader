import { Request, Response } from "express";

import { UploadsLog } from "../entities";
import { uploadsService } from "../services";

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
    console.log(req.body);

    const upload: UploadsLog = await uploadsService.create({
      name: req.body.name,
      size: req.body.size,
      format: req.body.format,
    });

    res.json(upload);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAll, create };
