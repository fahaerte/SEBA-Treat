import { baseApi } from "./baseApi";
import { IUserCredentials } from "@treat/lib-common";
import axios from "axios";

export const getMealOffer = async (
  mealOfferId: string,
  token: string | undefined
) => {
  const response = await baseApi(token).get(`/mealOffers/${mealOfferId}`);
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
  try {
    const result = await baseApi(token).post(
      `/mealOffers/${mealOfferId}/reservations`
    );
    return result.data;
  } catch (error: any) {
    console.log(error);
    throw {
      code: error.code,
      message: error.response.data,
      responseStatus: error.response?.status,
    };
  }
};
