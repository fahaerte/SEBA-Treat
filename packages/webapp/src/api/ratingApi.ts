import { baseApi } from "./baseApi";

export const rateUser = async (
  token: string,
  mealOfferId: string,
  mealReservationId: string,
  rating: number
) => {
  return await baseApi(token).post(
    `/ratings/mealOffer/${mealOfferId}/reservation/${mealReservationId}`,
    { rating: rating }
  );
};
