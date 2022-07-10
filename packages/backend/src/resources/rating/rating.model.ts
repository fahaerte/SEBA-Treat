import { Schema } from "mongoose";
import { RatingDocument } from "./rating.interface";

export const RatingSchema = new Schema<RatingDocument>(
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
