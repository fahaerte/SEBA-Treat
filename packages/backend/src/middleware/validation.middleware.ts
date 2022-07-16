import { NextFunction, Request, RequestHandler, Response } from "express";
import Joi from "joi";
import ValidatePart from "../utils/validation";

function validationMiddleware(
  schema: Joi.Schema,
  validatePart: ValidatePart = ValidatePart.BODY
): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    try {
      if (validatePart === ValidatePart.BODY) {
        req.body = await schema.validateAsync(req.body, validationOptions);
      } else if (validatePart === ValidatePart.PARAMS) {
        req.params = await schema.validateAsync(req.params, validationOptions);
      } else if (validatePart === ValidatePart.QUERY) {
        req.query = await schema.validateAsync(req.query, validationOptions);
      }
      next();
    } catch (error: any) {
      const errors: string[] = [];
      error.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });
      res.status(400).send({ errors: errors });
    }
  };
}

export default validationMiddleware;
