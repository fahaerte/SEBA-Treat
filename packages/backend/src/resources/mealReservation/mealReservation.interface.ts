import { Document, ObjectId } from "mongoose";
import MealReservationState from "./mealReservationState.enum";

export default interface MealReservation extends Document {
  buyer: ObjectId;
  reservationState: MealReservationState;
}
