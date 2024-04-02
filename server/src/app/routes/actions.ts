import express, { Router } from "express";

import { actionsController } from "../controllers";

const actionsRouter: Router = express.Router();

actionsRouter.get("/", actionsController.getAll);

export default actionsRouter;
