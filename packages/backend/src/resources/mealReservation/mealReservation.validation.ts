import Joi from "joi";

const create = Joi.object({
  mealOfferId: Joi.string().required(),
});

export default { create };
