import { model, Schema, Types } from "mongoose";
import MealReservation from "./mealReservation.interface";
import MealReservationStateEnum from "./mealReservationState.enum";
import MealReservationState from "./mealReservationState.enum";

const MealReservationSchema = new Schema<MealReservation>(
  {
    buyer: {
      type: Types.ObjectId,
      required: true,
    },
    seller: {
      type: Types.ObjectId,
      required: true,
    },
    mealOffer: {
      type: Types.ObjectId,
      required: true,
    },
    reservationState: {
      type: String,
      enum: Object.keys(MealReservationStateEnum),
      required: true,
      default: MealReservationState.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

export default model<MealReservation>("MealReservation", MealReservationSchema);
