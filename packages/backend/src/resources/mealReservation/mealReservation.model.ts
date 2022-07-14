import { Schema, Types } from "mongoose";
import { EMealReservationState } from "@treat/lib-common/lib/enums/EMealReservationState";
import { MealReservationDocument } from "./mealReservation.interface";

export const MealReservationSchema = new Schema<MealReservationDocument>(
  {
    buyer: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    reservationState: {
      type: String,
      enum: Object.values(EMealReservationState),
      required: true,
      default: EMealReservationState.PENDING,
    },
  },
  {
    timestamps: true,
  }
);
