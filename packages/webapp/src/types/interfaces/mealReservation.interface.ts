import User from "./user.interface";
import { EMealReservationState } from "@treat/lib-common";

export default interface MealReservation {
  _id: string;
  buyer: User;
  reservationState: EMealReservationState;
}
