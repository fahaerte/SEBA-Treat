import { IUser } from "./IUser";

export interface IRating {
  stars: number;
  mealTransaction: number;
  author: IUser;
  receiver: IUser;
}