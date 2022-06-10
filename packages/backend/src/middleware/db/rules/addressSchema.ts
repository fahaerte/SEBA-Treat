import Joi from "joi";
import { IAddress } from "@treat/lib-common";

export const addressSchema = {
  create: Joi.object<IAddress>({
    street: Joi.string().required(),
    housenumber: Joi.string().required(),
    postalcode: Joi.number().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
  }),
  update: Joi.object<IAddress>({
    street: Joi.string(),
    housenumber: Joi.string(),
    postalcode: Joi.number(),
    city: Joi.string(),
    country: Joi.string(),
  }),
};
