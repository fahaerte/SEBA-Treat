import dotenv from "dotenv";

dotenv.config();

export const config = {
  db: {
    connector: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.MONGO_PROJECT}.ar7en.mongodb.net`,
    name: `${process.env.DB_NAME}`,
  },
  server: {
    port: process.env.SERVER_PORT,
  },
};
