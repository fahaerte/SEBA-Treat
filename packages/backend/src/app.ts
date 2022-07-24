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
import { User } from "./resources/user/user.validation";
import { ConfigService } from "./utils/ConfigService";
import cookieParser from "cookie-parser";

class App {
  public express: Application;
  public port: number;
  public configService: ConfigService;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;
    this.configService = new ConfigService();

    this.initialiseDatabaseConnection();
    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
    this.initialiseErrorHandling();
    this.initializeSwagger();
  }

  private initialiseMiddleware(): void {
    this.express.use(helmet());
    this.express.use(
      cors({
        origin: "*",
        credentials: true,
        exposedHeaders: ["Authorization"],
      })
    );
    this.express.use(function (req, res, next) {
      res.header("Cross-Origin-Resource-Policy", "cross-origin");
      next();
    }, express.static("public"));
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(cookieParser());
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
    void mongoose.connect(
      `mongodb+srv://${this.configService.get(
        "MONGO_USER"
      )}:${this.configService.get("MONGO_PASSWORD")}@${this.configService.get(
        "MONGO_PATH"
      )}.ar7en.mongodb.net`
    );
  }

  // SWAGGER DOCS
  private initializeSwagger(): void {
    const swaggerOptions = {
      swaggerDefinition: {
        definitions: { ...User },
        info: {
          title: "Treat API",
          version: "1.0.0",
          basePath: "http:/localhost:5000/api/",
        },
        tags: [
          {
            name: "User",
            description: "User functions including authentication",
          },
          {
            name: "Stripe",
            description: "Stripe endpoints to purchase virtual credits",
          },
        ],
      },

      apis: [
        "./src/resources/user/user.controller.ts",
        "./src/resources/stripe/stripe.controller.ts",
      ],
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
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;
