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
  portions?: number,
  category?: string,
  allergen?: string,
  sellerRating?: number,
  startDate?: string,
  endDate?: string,
  price?: number,
  search?: string,
  distance?: number
) => {
  const response = await baseApi(token).get(`/mealOffers/previews`, {
    params: {
      address: address,
      portions: portions,
      category: category,
      sellerRating: sellerRating,
      startDate: startDate,
      endDate: endDate,
      price: price,
      search: search,
      distance: distance,
    },
  });
  return response.data;
};
