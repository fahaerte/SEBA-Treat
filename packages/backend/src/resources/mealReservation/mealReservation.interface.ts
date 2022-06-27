import {Document, ObjectId} from "mongoose";
import MealReservationState from "./mealReservationState.enum";

export default interface MealReservation extends Document {
    _id: string;
    buyer: ObjectId;
    reservationState: MealReservationState;
}
