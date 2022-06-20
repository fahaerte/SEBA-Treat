import {model, Schema, Types} from "mongoose";
import MealReservation from "./mealReservation.interface";
import MealReservationStateEnum from "./mealReservationState.enum";
import MealReservationState from "./mealReservationState.enum";

export const MealReservationSchema = new Schema<MealReservation>(
    {
        buyer: {
            type: Types.ObjectId,
            required: true,
            ref: "User"
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
