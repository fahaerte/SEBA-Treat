import MealReservation from "./mealReservation.interface";
import User from "./user.interface";

export default interface MealOffer {
  _id: string;
  title: string;
  description: string;
  user: User;
  categories: string[];
  allergens: string[];
  startDate: Date;
  endDate: Date;
  portions: number;
  pickUpDetails: string;
  price: number;
  transactionFee: number;
  reservations: MealReservation[];
}
