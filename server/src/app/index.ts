import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { createDatabase } from "typeorm-extension";

import { ormconfig, AppDataSource } from "../data-source";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

(async () => {
  await createDatabase({
    options: ormconfig,
    ifNotExist: true,
  });

  AppDataSource.initialize()
    .then(async () => {
      console.log("Db initialized!");
    })
    .catch((error) => {
      console.error("Error during db initialization", error);
    });
})();

app.post("/", (req, res) => {
  const ttt = req.body;
  console.log(ttt);
  console.log("Test");
});

const port = 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
