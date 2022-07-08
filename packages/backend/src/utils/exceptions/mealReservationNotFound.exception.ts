import HttpException from "./http.exception";

class MealReservationNotFoundException extends HttpException {
  constructor(mealOfferId: string, userId: string) {
    super(
      404,
      `Meal reservation for meal ${mealOfferId} and user ${userId} not found`
    );
  }
}

export default MealReservationNotFoundException;
