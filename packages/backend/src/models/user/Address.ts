import { model, Schema, Document } from "mongoose";
import { IAddress } from "@treat/lib-common";

interface IAddressModel extends IAddress, Document {}

const SAddress = new Schema<IAddressModel>({
  street: { type: String, required: true },
  housenumber: { type: String, required: true },
  postalcode: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export default model("Address", SAddress);
