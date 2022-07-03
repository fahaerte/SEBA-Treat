import { Document, ObjectId } from "mongoose";
import MealReservation from "../mealReservation/mealReservation.interface";

export default interface MealOffer extends Document {
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
  reservations: MealReservation[];

  // getPrice(): number;
}
