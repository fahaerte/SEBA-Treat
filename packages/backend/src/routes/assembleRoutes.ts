import express from "express";
import AddressRouter from "./AddressRouter";

export const assembleRoutes = (app: express.Application) => {
  app.use("/address", AddressRouter);
};
