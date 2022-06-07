import { Document, Schema } from "mongoose";

export interface IAddress extends Document {
  userId: string;
  street: string;
  housenumber: string;
  postalcode: number;
  city: string;
  country: string;
}

export const SAddress = new Schema<IAddress>({});
