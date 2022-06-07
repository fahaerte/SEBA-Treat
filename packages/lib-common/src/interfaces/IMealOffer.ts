import { IMealCategory } from "./IMealCategory";
import { IAllergens } from "./IAllergens";
import { model, Model, Schema, Types } from "mongoose";

export interface IMealOffer {
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
  author: Types.ObjectId;
}

export const SMealOffer = new Schema({
  categories: { type: [Schema.Types.ObjectId], ref: "MealCategory" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

export const MMealOffer: Model<IMealOffer> = model("MealOffer", SMealOffer);
