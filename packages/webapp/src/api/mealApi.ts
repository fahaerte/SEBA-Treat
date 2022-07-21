import { baseApi, baseApiAuth } from "./baseApi";
import { EMealReservationState, IMealOffer } from "@treat/lib-common";
import { getCookie } from "../utils/auth/CookieProvider";

export const getMealOffer = async (mealOfferId: string) => {
  const response = await baseApi().get(`/mealOffers/${mealOfferId}`);
  return response.data.data;
};

export const requestMealOffer = async ({
  mealOfferId,
}: requestMealOfferArgs) => {
  return await baseApiAuth().post(
    `/mealOffers/${mealOfferId}/reservations`
  );
};

export const createMealOffer = async ({
  mealOffer,
}: CreateMealOfferArgs) => {
  return await baseApiAuth().post("/mealOffers", mealOffer);
};

export const getMealOffersByParams = async (
  distance: number,
  portions?: number | undefined,
  category?: string | undefined,
  allergen?: string | undefined,
  sellerRating?: number | undefined,
  price?: number | undefined,
  search?: string | undefined
) => {
  const response = await baseApi().get(`/mealOffers/previews`, {
    params: {
      address: getCookie('address'),
      portions: portions,
      category: category,
      sellerRating: sellerRating,
      price: price,
      search: search,
      distance: distance,
    },
  });
  return response.data;
};

export const getSentMealOfferRequests = async () => {
  const response = await baseApiAuth().get(
    "/mealOffers/reservations/sent"
  );
  return response.data;
};

export const getReceivedMealOfferRequests = async () => {
  const response = await baseApiAuth().get(
    "/mealOffers/reservations/received"
  );
  return response.data;
};

export const updateMealReservationState = async (
  mealOfferId: string,
  mealOfferReservationId: string,
  newReservationState: EMealReservationState
) => {
  const newStateObject = {
    reservationState: newReservationState,
  };
  const response = await baseApiAuth().patch(
    `/mealOffers/${mealOfferId}/reservations/${mealOfferReservationId}`,
    newStateObject
  );
  return response.data;
};

interface requestMealOfferArgs {
  mealOfferId: string;
}

export interface CreateMealOfferArgs {
  mealOffer: Omit<
    IMealOffer,
    "_id" | "rating" | "transactionFee" | "reservations"
  >;
}
