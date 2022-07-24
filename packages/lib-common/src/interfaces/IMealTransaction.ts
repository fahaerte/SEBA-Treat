import { ETransactionState } from "../enums";

export interface IMealTransaction {
  _id: string;
  mealOfferId: string;
  mealReservationId: string;
  senderId: string;
  receiverId: string;
  amount: number;
  transactionFee: number;
  transactionState: ETransactionState;
  buyerRating: number;
  sellerRating: number;
  updatedAt: Date;
}
