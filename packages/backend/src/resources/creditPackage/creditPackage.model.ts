import { model, Schema } from "mongoose";
import CreditPackage from "./creditPackage.interface";

export const CreditPackageSchema = new Schema<CreditPackage>(
  {
    credits: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<CreditPackage>("CreditPackage", CreditPackageSchema);
