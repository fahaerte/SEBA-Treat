import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { SwaggerAddressDTO } from "./middleware";
import { mongoConnect } from "./loader";

const app: express.Application = express();

// SWAGGER DOCS
const swaggerOptions = {
  swaggerDefinition: {
    definitions: { ...SwaggerAddressDTO },
    info: {
      title: "Treat API",
      version: "1.0.0",
      basePath: "http:/localhost:5000",
      tags: [
        {
          name: "Address",
          description: "All user addresses",
        },
      ],
    },
  },
  apis: ["./src/routes/AddressRouter.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

void mongoConnect(app);
