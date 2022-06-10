import mongoose from "mongoose";
import { config } from "./config";
import { startServer } from "./server";
import express from "express";

export const mongoConnect = async (app: express.Application) => {
  await mongoose
    .connect(`${config.db.connector}`, { dbName: `${config.db.name}` })
    .then(async (m: mongoose.Mongoose) => {
      console.log("Successfully connected to " + m.connection.db.databaseName);
      await m.connection.db
        .collections()
        .then((res) =>
          // Log collections within the database
          {
            res.forEach((collection) => console.log(collection.collectionName));
            // CONNECT TO SERVER
            startServer(app);
          }
        )
        .catch((error) =>
          console.log("Error when fetching collection names ", error)
        );
    })
    .catch((error) => console.log(error));
};

export const mongoDisconnect = async () => {
  try {
    await mongoose
      .disconnect()
      .then(() => console.log("Successfully disconnected from MongODB"));
  } catch (error: unknown) {
    console.log(error);
  }
};
