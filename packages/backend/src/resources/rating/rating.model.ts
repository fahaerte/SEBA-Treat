import { Schema } from "mongoose";
import { IRating } from "@treat/lib-common/lib/interfaces/IRating";

export const RatingSchema = new Schema<IRating>(
  {
    buyerRating: {
      type: Number,
      min: 1,
    },
    sellerRating: {
      type: Number,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);
