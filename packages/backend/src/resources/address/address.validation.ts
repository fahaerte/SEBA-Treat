import Joi from "joi";

const create = Joi.object({
  street: Joi.string().required().example("Einhornalle"),
  houseNumber: Joi.string().required().example("12a"),
  postalCode: Joi.string().min(5).max(5).required().example("80333"),
  city: Joi.string().required().example("Munich"),
  country: Joi.string().required().example("Germany"),
});

const update = Joi.object({
  street: Joi.string().example("Einhornalle"),
  houseNumber: Joi.string().example("12a"),
  postalCode: Joi.string().min(5).max(5).example("80333"),
  city: Joi.string().example("Munich"),
  country: Joi.string().example("Germany"),
});

export default { create, update };
