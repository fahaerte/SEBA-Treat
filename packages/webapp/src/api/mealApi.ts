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
