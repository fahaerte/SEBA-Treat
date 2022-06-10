import Joi from "joi";
import { IAddress } from "@treat/lib-common";
import j2s from "joi-to-swagger";
import { Schema } from "swagger-jsdoc";

export const AddressDTO = {
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

export const SwaggerAddressDTO = {
  CreateAddressDTO: j2s(AddressDTO.create).swagger,
  UpdateAddressDTO: j2s(AddressDTO.update).swagger,
};
