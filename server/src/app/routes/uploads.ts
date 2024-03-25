import express, { Router } from "express";

import { uploadsController } from "../controllers";
import singleFileUpload from "../middlewares/fileUploader";

const uploadsRouter: Router = express.Router();

uploadsRouter.get("/", uploadsController.getAll);

uploadsRouter.post("/", singleFileUpload, uploadsController.create);

export default uploadsRouter;
