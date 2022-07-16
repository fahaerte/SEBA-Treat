import { model, Schema, Types } from "mongoose";
import MealTransaction from "./mealTransaction.interface";
import MealTransactionState from "./mealTransactionState.enum";
import MealTransactionStateEnum from "./mealTransactionState.enum";

const MealTransactionSchema = new Schema<MealTransaction>(
  {
    mealOfferId: {
      type: Types.ObjectId,
      required: true,
      unique: true,
    },
    mealReservationId: {
      type: Types.ObjectId,
      required: true,
      unique: true,
    },
    senderId: {
      type: Types.ObjectId,
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionFee: {
      type: Number,
      required: true,
    },
    transactionState: {
      type: String,
      enum: Object.keys(MealTransactionStateEnum),
      required: true,
      default: MealTransactionState.PENDING,
    },
    buyerRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    sellerRating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export default model<MealTransaction>("MealTransaction", MealTransactionSchema);
