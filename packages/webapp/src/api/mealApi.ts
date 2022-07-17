import { baseApi } from "./baseApi";
import { IUserCredentials } from "@treat/lib-common";

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

export const getMealOffersByParams = async (
  address: string,
  token: string,
  portions?: number | undefined,
  category?: string | undefined,
  allergen?: string | undefined,
  sellerRating?: number | undefined,
  // startDate?: string | undefined,
  // endDate?: number | undefined,
  price?: number | undefined,
  search?: string | undefined,
  distance?: number | undefined,
) => {
  const response = await baseApi(token).get(`/mealOffers/previews`, {
    params: {
      address: address,
      portions: portions,
      category: category,
      sellerRating: sellerRating,
      // startDate: startDate,
      // endDate: endDate,
      price: price,
      search: search,
      distance: String(distance),
    },
  });
  return response.data;
};
