import HttpException from "./http.exception";

class MealReservationNotFoundException extends HttpException {
  constructor(mealReservationId: string) {
    super(
      404,
      `Could not find mealOffer with meal reservation ${mealReservationId}`
    );
  }
}

export default MealReservationNotFoundException;
