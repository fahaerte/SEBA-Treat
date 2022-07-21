import { baseApiAuth } from "./baseApi";

export const rateUser = async (
  mealOfferId: string,
  mealReservationId: string,
  rating: number
) => {
  return await baseApiAuth().post(
    `/ratings/mealOffer/${mealOfferId}/reservation/${mealReservationId}`,
    { rating: rating }
  );
};
