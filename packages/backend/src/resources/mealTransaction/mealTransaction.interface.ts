import { Document, ObjectId } from "mongoose";
import MealTransactionState from "./mealTransactionState.enum";

interface MealTransaction extends Document {
  mealOfferId: ObjectId;
  mealReservationId: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  amount: number;
  transactionFee: number;
  transactionState: MealTransactionState;
  buyerRating: number;
  sellerRating: number;
}

export default MealTransaction;
