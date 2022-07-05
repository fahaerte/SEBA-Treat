import { Joi } from "@treat/lib-common";
import { ConfigServiceAbstract } from "@treat/lib-common";

export const configValues = {
  BASE_URL: Joi.string(),
  API_URL: Joi.string(),
  STRIPE_API_PUBLIC_KEY: Joi.string(),
};

export class ConfigService extends ConfigServiceAbstract<typeof configValues> {
  constructor() {
    super(configValues, undefined, {
      BASE_URL: process.env.BASE_URL,
      API_URL: process.env.API_URL,
      STRIPE_API_PUBLIC_KEY: process.env.STRIPE_API_PUBLIC_KEY,
    });
  }
}
