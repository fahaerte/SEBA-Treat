import { Model, model, Schema } from "mongoose";

export interface IAddress {
  userId: string;
  street: string;
  housenumber: string;
  postalcode: number;
  city: string;
  country: string;
}

export const SAddress = new Schema<IAddress>({});

export const MAddress: Model<IAddress> = model("Address", SAddress);
