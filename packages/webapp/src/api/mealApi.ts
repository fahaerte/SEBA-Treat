import { baseApi } from "./baseApi";

export const getMealOffer = async (
  mealOfferId: string,
  token: string | undefined
) => {
  const response = await baseApi(token).get(`/mealOffers/${mealOfferId}`);
  return response.data;
};
