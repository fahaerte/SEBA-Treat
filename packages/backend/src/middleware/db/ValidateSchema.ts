import { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { addressSchema } from "./rules/addressSchema";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      console.log(error);

      return res.status(422).json({ error });
    }
  };
};

export const schema = {
  address: addressSchema,
};
