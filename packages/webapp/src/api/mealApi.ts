import { baseApi } from "./baseApi";
import { EMealReservationState, IMealOffer } from "@treat/lib-common";

export const getMealOffer = async (
  mealOfferId: string,
  token: string | undefined
) => {
  const response = await baseApi(token).get(
    `/mealOffers/${mealOfferId}/details`
  );
  return response.data.data;
};

export const requestMealOffer = async ({
  mealOfferId,
  token,
}: requestMealOfferArgs) => {
  return await baseApi(token).post(`/mealOffers/${mealOfferId}/reservations`);
};

export const createMealOffer = async ({
  mealOffer,
  token,
}: CreateMealOfferArgs) => {
  return await baseApi(token).post("/mealOffers", mealOffer);
};

export const getMealOffersByParams = async (
  address: string,
  distance: number,
  portions?: number | undefined,
  category?: string | undefined,
  allergen?: string | undefined,
  sellerRating?: number | undefined,
  price?: number | undefined,
  search?: string | undefined
) => {
  const response = await baseApi(undefined).get(`/mealOffers/previews`, {
    params: {
      address: address,
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

export const getSentMealOfferRequests = async (token: string) => {
  const response = await baseApi(token).get("/mealOffers/reservations/sent");
  return response.data;
};

export const getReceivedMealOfferRequests = async (token: string) => {
  const response = await baseApi(token).get(
    "/mealOffers/reservations/received"
  );
  return response.data;
};

export const updateMealReservationState = async (
  token: string,
  mealOfferId: string,
  mealOfferReservationId: string,
  newReservationState: EMealReservationState
) => {
  const newStateObject = {
    reservationState: newReservationState,
  };
  const response = await baseApi(token).patch(
    `/mealOffers/${mealOfferId}/reservations/${mealOfferReservationId}`,
    newStateObject
  );
  return response.data;
};

interface requestMealOfferArgs {
  mealOfferId: string;
  token: string | undefined;
}

export interface CreateMealOfferArgs {
  mealOffer: Omit<
    IMealOffer,
    "_id" | "rating" | "transactionFee" | "reservations"
  >;
  token: string;
}
