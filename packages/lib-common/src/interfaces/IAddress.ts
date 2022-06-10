import { Model, model, Schema } from "mongoose";

export interface IAddress {
  street: string;
  housenumber: string;
  postalcode: number;
  city: string;
  country: string;
}
