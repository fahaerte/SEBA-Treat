import express from "express";

export const logger = (app: express.Application) => {
  app.use((req, res, next) => {
    // Logs requests
    console.log(`Incoming -> METHOD: [${req.method}] - URL: [${req.url}]`);

    res.on("finish", () => {
      console.log(
        `Finish -> METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });
};
