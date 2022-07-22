import { model, Schema, Types } from "mongoose";
import MealTransactionDocument from "./mealTransaction.interface";
import { ETransactionState } from "@treat/lib-common";

const MealTransactionSchema = new Schema<MealTransactionDocument>(
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
      enum: Object.keys(ETransactionState),
      required: true,
      default: ETransactionState.PENDING,
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

export default model<MealTransactionDocument>(
  "MealTransaction",
  MealTransactionSchema
);
