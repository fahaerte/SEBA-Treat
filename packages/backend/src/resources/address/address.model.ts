import { Schema } from "mongoose";
import { IAddress } from "@treat/lib-common";

export const AddressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
    maxlength: 5,
    minlength: 5,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
