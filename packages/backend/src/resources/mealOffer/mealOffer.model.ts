import { model, Schema, Types } from "mongoose";
import MealOffer from "../mealOffer/mealOffer.interface";
import { MealReservationSchema } from "../mealReservation/mealReservation.model";
import MealCategory from "../mealCategory/mealCategory.enum";
import MealAllergen from "../mealAllergen/mealAllergen.enum";

const MealOfferSchema = new Schema<MealOffer>(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        enum: Object.values(MealCategory),
        required: true,
      },
    ],
    allergens: [
      {
        type: String,
        enum: Object.values(MealAllergen),
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    portions: {
      type: Number,
      required: true,
      min: 1,
    },
    pickUpDetails: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    transactionFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    reservations: [MealReservationSchema],
  },
  { timestamps: true }
);

export default model<MealOffer>("MealOffer", MealOfferSchema);
