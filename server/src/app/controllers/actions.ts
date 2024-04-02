import { Request, Response } from "express";

import { ImportTypeActions } from "../entities";
import { actionsService } from "../services";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const actions: ImportTypeActions[] = await actionsService.getAll();

    res.json(actions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAll };
