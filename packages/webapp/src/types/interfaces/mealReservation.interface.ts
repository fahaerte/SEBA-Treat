import MealReservationState from "../enums/mealReservationState.enum";
import User from "./user.interface";

export default interface MealReservation {
  _id: string;
  buyer: User;
  reservationState: MealReservationState;
}
