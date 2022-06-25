import { ICreditPackage, ICreditDiscount } from "@treat/lib-common";
import Joi from "joi";
import j2s from "joi-to-swagger";

const products = {
  create: Joi.object<ICreditPackage>({
    price: Joi.number().required().example(1),
    name: Joi.string().required().example("package_250"),
    title: Joi.string().required().example("250 Credits"),
  }),

  update: Joi.object({
    productId: Joi.string().required(),
    price: Joi.number().example(1),
    name: Joi.string().example("package_250"),
    title: Joi.string().example("250 Credits"),
  }),
};

export const Stripe = {
  CreateProduct: j2s(products.create).swagger,
  UpdateProduct: j2s(products.update).swagger,
};
