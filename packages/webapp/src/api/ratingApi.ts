import { baseApi, baseApiAuth } from "./baseApi";

export const rateUser = async (
  token: string,
  mealOfferId: string,
  mealReservationId: string,
  rating: number
) => {
  return await baseApiAuth(token).post(
    `/ratings/mealOffer/${mealOfferId}/reservation/${mealReservationId}`,
    { rating: rating }
  );
};
