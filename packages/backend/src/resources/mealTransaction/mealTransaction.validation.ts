import Joi from "joi";

const createTransaction = Joi.object({
  mealReservation: Joi.string().required(),
  senderAccount: Joi.string().required(),
  receiverAccount: Joi.string().required(),
});

const rateTransaction = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
});

export default { createTransaction, rateTransaction };
