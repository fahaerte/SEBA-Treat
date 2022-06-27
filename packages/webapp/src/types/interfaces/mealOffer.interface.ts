import MealReservation from "./mealReservation.interface";

export default interface MealOffer {
  _id: string;
  title: string;
  description: string;
  user: string;
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
