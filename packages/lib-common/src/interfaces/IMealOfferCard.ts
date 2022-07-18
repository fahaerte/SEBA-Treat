import { IUser } from "./IUser";

export interface IMealOfferCard {
  _id: string;
  title: string;
  user: IUser;
  categories: string[];
  allergens: string[];
  startDate: Date;
  endDate: Date;
  portions: number;
  price: number;
  rating: number;
  distance: number;
  image?: File;
}
