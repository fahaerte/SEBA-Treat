import { Joi } from "@treat/lib-common/lib/services/types";
import { ConfigServiceAbstract } from "@treat/lib-common";

export const configValues = {
  BASE_URL: Joi.string(),
  API_URL: Joi.string(),
  MEAL_IMAGES_URL: Joi.string(),
  STRIPE_API_PUBLIC_KEY: Joi.string(),
};

export class ConfigService extends ConfigServiceAbstract<typeof configValues> {
  constructor() {
    super(configValues, undefined, {
      API_URL: process.env.API_URL,
      BASE_URL: process.env.BASE_URL,
      MEAL_IMAGES_URL: process.env.MEAL_IMAGES_URL,
      STRIPE_API_PUBLIC_KEY: process.env.STRIPE_API_PUBLIC_KEY,
    });
  }
}
