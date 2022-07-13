import Joi from "joi";
import MealReservationStateEnum from "../mealReservation/mealReservationState.enum";
import EMealCategory from "@treat/lib-common/lib/enums/EMealCategory";
import EMealAllergen from "@treat/lib-common/lib/enums/EMealAllergen";

const createBody = Joi.object({
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
});

const updateReservationStateBody = Joi.object({
  reservationState: Joi.string()
    .valid(...Object.values(MealReservationStateEnum))
    .required(),
});

const updateReservationStateParams = Joi.object({
  mealOfferId: Joi.string()
    .regex(/^[a-f\d]{24}$/i)
    .required(),
  mealReservationId: Joi.string()
    .regex(/^[a-f\d]{24}$/i)
    .required(),
});

const getMealOfferParams = Joi.object({
  mealOfferId: Joi.string().regex(/^[a-f\d]{24}$/i),
});

const getMealOfferPreviewsQuery = Joi.object({
  category: Joi.string().valid(...Object.values(EMealCategory)),
  allergen: Joi.string().valid(...Object.values(EMealAllergen)),
  portions: Joi.number().min(1),
  sellerRating: Joi.number(),
  startDate: Joi.date().iso().min(Date.now()),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")),
  price: Joi.number(),
  search: Joi.string().min(1),
  distance: Joi.number()
});

const createMealOfferReservationParams = Joi.object({
  mealOfferId: Joi.string().regex(/^[a-f\d]{24}$/i),
});

export default {
  createBody,
  updateReservationStateBody,
  getMealOfferPreviewsQuery,
  getMealOffer: getMealOfferParams,
  updateReservationStateParams,
  createMealOfferReservationParams,
};
