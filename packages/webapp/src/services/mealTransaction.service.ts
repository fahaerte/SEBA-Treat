import ApiService from "./api.service";

class MealTransactionService {
  private static readonly PATH = "/ratings";

  public static rateTransaction = async (
    mealOfferId: string,
    mealReservationId: string,
    rating: number
  ): Promise<void> => {
    await ApiService.patch(
      `${MealTransactionService.PATH}/mealOffer/${mealOfferId}/reservation/${mealReservationId}`,
      { rating: rating }
    );
  };
}

export default MealTransactionService;
