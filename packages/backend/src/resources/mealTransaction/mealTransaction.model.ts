import { model, Schema, Types } from "mongoose";
import MealTransaction from "./mealTransaction.interface";
import MealTransactionState from "./mealTransactionState.enum";
import MealTransactionStateEnum from "./mealTransactionState.enum";
import { RatingSchema } from "../rating/rating.model";

const MealTransactionSchema = new Schema<MealTransaction>(
  {
    mealReservation: {
      type: Types.ObjectId,
      required: true,
    },
    senderAccount: {
      type: Types.ObjectId,
      required: true,
    },
    receiverAccount: {
      type: Types.ObjectId,
      required: true,
    },
    transactionState: {
      type: String,
      enum: Object.keys(MealTransactionStateEnum),
      required: true,
      default: MealTransactionState.PENDING,
    },
    ratings: [
      {
        type: RatingSchema,
        minItems: 0,
        maxItems: 2,
      },
    ],
  },
  { timestamps: true }
);

export default model<MealTransaction>("MealTransaction", MealTransactionSchema);
