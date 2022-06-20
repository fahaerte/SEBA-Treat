import { Document, ObjectId } from "mongoose";
import MealTransactionState from "./mealTransactionState.enum";

interface MealTransaction extends Document {
  mealReservation: ObjectId;
  senderAccount: ObjectId;
  receiverAccount: ObjectId;
  transactionState: MealTransactionState;
}

export default MealTransaction;
