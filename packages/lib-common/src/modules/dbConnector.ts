import dotenv from "dotenv";
import mongoose from "mongoose";

export const dbConnector = async () => {
  dotenv.config();
  await mongoose
    .connect(`${process.env.DB_CONNECTOR}`, { dbName: "Treat" })
    .then(async (m: mongoose.Mongoose) => {
      console.log("Successfully connected to " + m.connection.db.databaseName);
      await m.connection.db
        .collections()
        .then((res) =>
          res.forEach((collection) => console.log(collection.collectionName))
        )
        .catch((error) =>
          console.log("Error when fetching collection names ", error)
        );
    })
    .catch((error) => console.log(error));
};

export const dbDisconnector = async () => {
  try {
    await mongoose
      .disconnect()
      .then(() => console.log("Successfully disconnected from MongODB"));
  } catch (error: unknown) {
    console.log(error);
  }
};
