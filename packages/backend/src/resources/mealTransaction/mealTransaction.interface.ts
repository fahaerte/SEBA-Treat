import { Document, ObjectId } from "mongoose";
import { ETransactionState } from "@treat/lib-common";
import { IMealTransaction } from "@treat/lib-common";

interface MealTransactionDocument
  extends Omit<
      IMealTransaction,
      "_id" | "mealOfferId" | "mealReservationId" | "senderId" | "receiverId"
    >,
    Document {
  _id: ObjectId;
  mealOfferId: ObjectId;
  mealReservationId: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  amount: number;
  transactionFee: number;
  transactionState: ETransactionState;
  buyerRating: number;
  sellerRating: number;
}

export default MealTransactionDocument;
