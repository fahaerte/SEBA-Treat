import { baseApiAuth } from "./baseApi";

export const rateUser = async (mealReservationId: string, rating: number) => {
  return await baseApiAuth().post(
    `/ratings/reservations/${mealReservationId}`,
    { rating: rating }
  );
};
