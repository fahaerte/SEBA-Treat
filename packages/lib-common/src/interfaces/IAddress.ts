import { Model, model, Schema } from "mongoose";

export interface IAddress {
  street: string;
  housenumber: string;
  postalcode: number;
  city: string;
  country: string;
}

export const SAddress = new Schema<IAddress>({
  street: { type: String, required: true },
  housenumber: { type: String, required: true },
  postalcode: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export const MAddress: Model<IAddress> = model("Address", SAddress);
