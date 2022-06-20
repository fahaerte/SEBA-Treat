import Joi from "joi";

const createTransaction = Joi.object({
  mealReservation: Joi.string().required(),
  senderAccount: Joi.string().required(),
  receiverAccount: Joi.string().required(),
});

export default { createTransaction };
