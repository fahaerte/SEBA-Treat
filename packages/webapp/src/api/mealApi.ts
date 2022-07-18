import { baseApi } from "./baseApi";
import { IMealOffer, IUserCredentials } from "@treat/lib-common";

export const getMealOffer = async (
  mealOfferId: string,
  token: string | undefined
) => {
  const response = await baseApi(token).get(
    `/mealOffers/${mealOfferId}/details`
  );
  return response.data.data;
};

export const login = async (credentials: IUserCredentials) => {
  return await baseApi(undefined).post("/users/login", credentials);
};

interface requestMealOfferArgs {
  mealOfferId: string;
  token: string | undefined;
}

export const requestMealOffer = async ({
  mealOfferId,
  token,
}: requestMealOfferArgs) => {
  return await baseApi(token).post(`/mealOffers/${mealOfferId}/reservations`);
};

export interface CreateMealOfferArgs {
  mealOffer: Omit<
    IMealOffer,
    "_id" | "rating" | "transactionFee" | "reservations"
  >;
  token: string;
}

/**
 * - user Id
 * - MealOfferDocument
 */

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
  search?: string | undefined,
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
