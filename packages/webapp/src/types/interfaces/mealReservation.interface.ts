import MealReservationState from "../enums/mealReservationState.enum";

export default interface MealReservation {
  _id: string;
  buyer: string;
  reservationState: MealReservationState;
}
