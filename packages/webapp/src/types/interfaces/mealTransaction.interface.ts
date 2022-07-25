import User from "./user.interface";

export default interface MealTransaction {
  _id: string;
  buyer: User;
  seller: User;
  amount: number;
  date: string;
}
