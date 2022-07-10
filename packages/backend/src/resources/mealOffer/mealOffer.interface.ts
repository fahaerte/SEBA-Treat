import { Document, ObjectId } from "mongoose";
import MealReservation from "../mealReservation/mealReservation.interface";
import { Rating } from "../rating/rating.interface";

export interface MealOffer {
  title: string;
  description: string;
  user: ObjectId;
  categories: string[];
  allergens: string[];
  startDate: Date;
  endDate: Date;
  portions: number;
  pickUpDetails?: string;
  price: number;
  transactionFee: number;
  reservations: MealReservation[];
  rating?: Rating;
}

export interface MealOfferDocument extends MealOffer, Document {
  // categories: Types.Array<string>
  // allergens: Types.Array<string>
  // reservations: Types.Array<MealReservation>
}
