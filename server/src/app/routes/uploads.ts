import express, { Router } from "express";

import { uploadsController } from "../controllers";

const uploadsRouter: Router = express.Router();

uploadsRouter.get("/", uploadsController.getAll);

uploadsRouter.post("/", uploadsController.create);

export default uploadsRouter;
