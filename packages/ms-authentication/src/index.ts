import express from "express";
import dotenv from "dotenv";
import { dbConnector } from "@treat/lib-common";
import cors from "cors";

dotenv.config();
const app: express.Application = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("It works!");
});

app.listen(5000, () => {
  console.log("Application is listening on port 5000");
});

void dbConnector();
