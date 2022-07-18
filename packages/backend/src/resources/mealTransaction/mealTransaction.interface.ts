import { Document, ObjectId } from "mongoose";
import { ETransactionState } from "@treat/lib-common";

interface MealTransaction extends Document {
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

export default MealTransaction;
