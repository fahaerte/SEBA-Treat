import { Document, ObjectId } from "mongoose";
import MealTransactionState from "./mealTransactionState.enum";
import Rating from "../rating/rating.interface";

interface MealTransaction extends Document {
  mealReservation: ObjectId;
  senderAccount: ObjectId;
  receiverAccount: ObjectId;
  transactionState: MealTransactionState;
  buyerRating: number;
  sellerRating: number;
}

export default MealTransaction;
