import { Schema, model, Types } from "mongoose";
import VirtualBank from "./virtualBank.interface";

const VirtualBankSchema = new Schema<VirtualBank>(
  {
    centralFee: {
      type: Number,
      required: true,
    },
    userStartingBalance: {
      type: Number,
      required: true,
    },
    virtualCentralAccount: {
      type: Types.ObjectId,
      ref: "VirtualCentralAccount",
      required: false,
    },
  },
  { timestamps: true }
);

export default model<VirtualBank>("VirtualBank", VirtualBankSchema);
