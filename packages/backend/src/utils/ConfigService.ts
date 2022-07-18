import { Joi } from "@treat/lib-common/lib/services/types";
import { ConfigServiceAbstract } from "@treat/lib-common";

export const configValues = {
  NODE_ENV: Joi.string(),
  PORT: Joi.number(),
  MONGO_PATH: Joi.string(),
  MONGO_USER: Joi.string(),
  MONGO_PASSWORD: Joi.string(),
  JWT_SECRET: Joi.string(),
  CENTRAL_BANK_ID: Joi.string(),
  CLIENT_URL: Joi.string(),
  STRIPE_API_SECRET_KEY: Joi.string(),
  STRIPE_CHECKOUT: Joi.string(),
  GOOGLE_MAPS_API_KEY: Joi.string(),
};

export class ConfigService extends ConfigServiceAbstract<typeof configValues> {
  constructor() {
    super(configValues, undefined, {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      MONGO_PATH: process.env.MONGO_PATH,
      MONGO_USER: process.env.MONGO_USER,
      MONGO_PASSWORD: process.env.MONGO_PASSWORD,
      JWT_SECRET: process.env.JWT_SECRET,
      STRIPE_API_SECRET_KEY: process.env.STRIPE_API_SECRET_KEY,
      CLIENT_URL: process.env.CLIENT_URL,
      CENTRAL_BANK_ID: process.env.CENTRAL_BANK_ID,
      STRIPE_CHECKOUT: process.env.STRIPE_CHECKOUT,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    });
  }
}
