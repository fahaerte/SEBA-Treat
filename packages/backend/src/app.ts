import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";

import Controller from "./utils/interfaces/controller.interface";
import ErrorMiddleware from "./middleware/error.middleware";
import helmet from "helmet";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { UserDTO } from "./resources/user/user.validation";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
    this.initializeSwagger();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initialiseDatabaseConnection(): void {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    void mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_PATH}.ar7en.mongodb.net`
    );
  }

  // SWAGGER DOCS
  private initializeSwagger(): void {
    const swaggerOptions = {
      swaggerDefinition: {
        definitions: { ...UserDTO },
        info: {
          title: "Treat API",
          version: "1.0.0",
          basePath: "http:/localhost:5000/api/",
          tags: [
            {
              name: "UserDTO",
              description: "register and login user",
            },
          ],
        },
      },
      apis: ["./src/resources/user/user.controller.ts"],
    };

    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    this.express.use(
      "/api-docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerDocs)
    );
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
