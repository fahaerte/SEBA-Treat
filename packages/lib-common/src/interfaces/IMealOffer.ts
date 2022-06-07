import { Document } from "mongoose";
import { IMealCategory } from "./IMealCategory";
import { IAllergens } from "./IAllergens";

export interface IMealOffer extends Document {
  title: string;
  description: string;
  categories: IMealCategory[];
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  images: File[];
  portions: number;
  pickupDetails?: string;
  price: string;
  transactionFee: string;
  allergens?: IAllergens;
  allergenVerified: boolean;
}
