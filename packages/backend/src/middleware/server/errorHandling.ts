import express from "express";

export const errorHandling = (app: express.Application) => {
  app.use((req, res, next) => {
    const error = new Error("Route does not exist");
    return res.status(404).json({ message: error.message });
  });
};
