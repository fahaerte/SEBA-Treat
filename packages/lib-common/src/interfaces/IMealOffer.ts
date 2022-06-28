import { IAllergens } from "./IAllergens";
import { Types } from "mongoose";

export interface IMealOffer {
  title: string;
  description: string;
  categories?: string[];
  startDate: Date;
  endDate: Date;
  images: File[];
  portions: number;
  pickupDetails?: string;
  price: string;
  transactionFee: string;
  allergens?: IAllergens;
  allergenVerified: boolean;
  // author: Types.ObjectId;
}
