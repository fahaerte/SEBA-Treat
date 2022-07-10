import Joi from "joi";

const rate = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
});

export default { rate };
