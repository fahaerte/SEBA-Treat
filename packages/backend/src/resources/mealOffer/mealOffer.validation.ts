import Joi from "joi";
import MealReservationStateEnum from "../mealReservation/mealReservationState.enum";
import EMealCategory from "@treat/lib-common/src/enums/EMealCategory";
import EMealAllergen from "@treat/lib-common/src/enums/EMealAllergen";

const create = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  categories: Joi.array()
    .min(1)
    .items(Joi.string().valid(...Object.values(EMealCategory)))
    .required(),
  allergens: Joi.array().items(
    Joi.string().valid(...Object.values(EMealAllergen))
  ),
  startDate: Joi.date().iso().required().min(Date.now()),
  endDate: Joi.date().iso().required().greater(Joi.ref("startDate")),
  portions: Joi.number().min(0).required(),
  pickUpDetails: Joi.string().required(),
  price: Joi.number().required(),
  transactionFee: Joi.number().required(),
});

const updateReservationState = Joi.object({
  reservationState: Joi.string()
    .valid(...Object.values(MealReservationStateEnum))
    .required(),
});

export default { create, updateReservationState };
