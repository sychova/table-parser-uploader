import express, { Request, Response } from "express";
import cors from "cors";
// import dotenv from "dotenv"

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const port = 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
