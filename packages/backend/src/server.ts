import express from "express";
import http from "http";
import { logger, errorHandling, apiConfig } from "./middleware";
import { config } from "./config";
import { assembleRoutes } from "./routes/assembleRoutes";

export const startServer = (app: express.Application) => {
  // LOG REQUESTS
  logger(app);
  // SERVER CONFIG
  apiConfig(app);
  // ROUTER
  assembleRoutes(app);
  // SERVER HEALTHCHECK
  app.get("/", (req, res) => res.status(200).send("Treat Backend Service"));

  // ERROR HANDLING
  errorHandling(app);
  http.createServer(app).listen(config.server.port);
  console.log(`Server is running on port ${config.server.port}`);
};
