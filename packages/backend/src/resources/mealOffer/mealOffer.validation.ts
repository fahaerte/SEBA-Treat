import Joi from "joi";
import {
  EMealAllergen,
  EMealCategory,
  EMealReservationState,
  IMealOffer,
} from "@treat/lib-common";

const createBody = Joi.object<Partial<IMealOffer>>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  categories: Joi.array()
    .required()
    .min(1)
    .items(Joi.string().valid(...Object.values(EMealCategory))),
  allergens: Joi.array().items(
    Joi.string().valid(...Object.values(EMealAllergen))
  ),
  startDate: Joi.date().iso().required().min(Date.now()),
  endDate: Joi.date().iso().required().greater(Joi.ref("startDate")),
  portions: Joi.number().min(1).required(),
  pickUpDetails: Joi.string().allow(""),
  price: Joi.number().required(),
  allergensVerified: Joi.boolean().required(),
});

const updateMealOfferParams = Joi.object({
  mealOfferId: Joi.string()
    .regex(/^[a-f\d]{24}$/i)
    .required(),
});

const updateMealOfferBody = Joi.object<Partial<IMealOffer>>({
  title: Joi.string(),
  description: Joi.string(),
  image: Joi.string(),
  categories: Joi.array().items(
    Joi.string().valid(...Object.values(EMealCategory))
  ),
  allergens: Joi.array().items(
    Joi.string().valid(...Object.values(EMealAllergen))
  ),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")),
  portions: Joi.number().min(1),
  pickUpDetails: Joi.string().allow(""),
  price: Joi.number(),
  allergensVerified: Joi.boolean(),
});

const updateReservationStateBody = Joi.object({
  reservationState: Joi.string()
    .valid(...Object.values(EMealReservationState))
    .required(),
});

const updateReservationStateParams = Joi.object({
  mealReservationId: Joi.string()
    .regex(/^[a-f\d]{24}$/i)
    .required(),
});

const getMealOfferParams = Joi.object({
  mealOfferId: Joi.string().regex(/^[a-f\d]{24}$/i),
});

const getMealOfferQuery = Joi.object({
  compareAddress: Joi.string().min(1),
});

const getMealOfferBody = Joi.object({
  compareAddress: Joi.string().min(1),
});

const getMealOfferPreviewsQuery = Joi.object({
  category: Joi.string().valid(...Object.values(EMealCategory)),
  allergen: Joi.alternatives().try(
      Joi.array().items(Joi.string().valid(...Object.values(EMealAllergen))),
      Joi.string().valid(...Object.values(EMealAllergen))
  ),
  portions: Joi.number().min(1),
  sellerRating: Joi.number(),
  startDate: Joi.date().iso().min(Date.now()),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")),
  price: Joi.number().min(1),
  search: Joi.string().min(1),
  distance: Joi.number().min(1).required(),
  address: Joi.string().min(1).required(),
  page: Joi.number().min(1).required(),
  pageLimit: Joi.number().min(1).required(),
  sortingRule: Joi.string(),
});

const createMealOfferReservationParams = Joi.object({
  mealOfferId: Joi.string().regex(/^[a-f\d]{24}$/i),
});

export default {
  createBody,
  updateMealOfferBody,
  updateMealOfferParams,
  updateReservationStateBody,
  getMealOfferPreviewsQuery,
  getMealOfferParams,
  getMealOfferQuery,
  getMealOfferBody,
  updateReservationStateParams,
  createMealOfferReservationParams,
};
