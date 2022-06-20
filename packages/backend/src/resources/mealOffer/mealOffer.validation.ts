import Joi from "joi";
import MealReservationStateEnum from "../mealReservation/mealReservationState.enum";
import MealCategory from "../mealCategory/mealCategory.enum";
import MealAllergen from "../mealAllergen/mealAllergen.enum";

const create = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  categories: Joi.array()
    .min(1)
    .items(Joi.string().valid(...Object.values(MealCategory)))
    .required(),
  allergens: Joi.array().items(
    Joi.string().valid(...Object.values(MealAllergen))
  ),
  startDate: Joi.date().iso().required().min(Date.now()),
  endDate: Joi.date().iso().required().greater(Joi.ref("startDate")),
  portions: Joi.number().min(0).required(),
  pickUpDetails: Joi.string().required(),
  price: Joi.number().required(),
});

const updateReservationState = Joi.object({
  reservationState: Joi.string()
    .valid(...Object.values(MealReservationStateEnum))
    .required(),
});

export default { create, updateReservationState };
