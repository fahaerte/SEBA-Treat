import {ObjectId} from "mongoose";
import {IMealOfferReservation} from "./IMealOfferReservation";

export interface IMealOffer extends Document {
  title: string;
  description: string;
  user: ObjectId;
  categories: ObjectId[];
  allergens: ObjectId[];
  startDate: Date;
  endDate: Date;
  portions: number;
  pickUpDetails: string;
  price: number;
  transactionFee: number;
  reservations: IMealOfferReservation[];
}

