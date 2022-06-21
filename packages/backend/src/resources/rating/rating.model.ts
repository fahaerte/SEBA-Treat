import { Schema, Types } from "mongoose";
import Rating from "./rating.interface";

export const RatingSchema = new Schema<Rating>(
  {
    authorId: {
      type: Types.ObjectId,
      required: true,
    },
      receiverId: {
          type: Types.ObjectId,
          required: true,
      },
    stars: {
      type: Number,
      required: true,
        min: 0,
        max: 5,
    },
  },
  {
    timestamps: true,
  }
);
