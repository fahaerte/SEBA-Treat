import { Model, model, Schema, Types } from "mongoose";
import {
  MealTransactionDocument,
  MealTransactionDocumentWithUserNames,
} from "./mealTransaction.interface";
import { ETransactionState } from "@treat/lib-common";
import UserDocument from "../user/user.interface";

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

export interface MealTransactionModel extends Model<MealTransactionDocument> {
  findWithUser(
    user: UserDocument
  ): Promise<MealTransactionDocumentWithUserNames[]>;
}

MealTransactionSchema.statics.findBy = async function (
  this: Model<MealTransactionDocument>,
  mealOfferId: string
  // user?: UserDocument
) {
  const projection: Record<string, any> = {
    _id: 1,
    mealOfferId: 1,
    mealReservationId: 1,
    senderId: 1,
    receiverId: 1,
    amount: 1,
    transactionFee: 1,
    createdAt: 1,
    updatedAt: 1,
  };
  return this.findById(mealOfferId, projection).populate(
    "user",
    "firstName lastName meanRating countRatings address"
  );
};

export default model<MealTransactionDocument>(
  "MealTransaction",
  MealTransactionSchema
);
