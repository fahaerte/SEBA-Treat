import HttpException from "./http.exception";
import { ObjectId } from "mongoose";

class MealReservationNotFoundException extends HttpException {
  constructor(mealOfferId: ObjectId, userId: ObjectId) {
    super(
      404,
      `Meal reservation for meal ${mealOfferId} and user ${userId} not found`
    );
  }
}

export default MealReservationNotFoundException;
