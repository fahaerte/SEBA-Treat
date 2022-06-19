import { model, Schema, Types } from "mongoose";
import MealOffer from "../mealOffer/mealOffer.interface";

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
        type: Types.ObjectId,
        required: true,
      },
    ],
    allergens: [
      {
        type: Types.ObjectId,
        required: true,
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
  },
  { timestamps: true }
);

export default model<MealOffer>("MealOffer", MealOfferSchema);
