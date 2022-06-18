import { Document, ObjectId } from "mongoose";
import MealReservationState from "./mealReservationState.enum";

export default interface MealReservation extends Document {
  buyer: ObjectId;
  seller: ObjectId;
  mealOffer: ObjectId;
  reservationState: MealReservationState;
}
