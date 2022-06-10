import express from "express";
import cors from "cors";

export const apiConfig = (app: express.Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Conrtol-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization, Accept"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });
};
