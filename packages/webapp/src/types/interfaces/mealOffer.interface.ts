import MealReservation from "./mealReservation.interface";
import User from "./user.interface";
import { Rating } from "./rating.interface";

export default interface MealOffer {
  _id: string;
  title: string;
  description: string;
  user: User;
  categories: string[];
  allergens: string[];
  startDate: Date;
  image: string;
  endDate: Date;
  portions: number;
  pickUpDetails: string;
  price: number;
  transactionFee: number;
  reservations: MealReservation[];
  rating?: Rating;
}
