import Joi from "joi";

const createAccount = Joi.object({
  balance: Joi.number().required(),
});

export default { createAccount };
