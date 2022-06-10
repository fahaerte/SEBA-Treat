import express from "express";
import { mongoConnect } from "./mongoConnect";

const app: express.Application = express();

void mongoConnect(app);
