import { model, Schema } from "mongoose";
import VirtualAccount from "./virtualAccount.interface";

export const VirtualAccountSchema = new Schema<VirtualAccount>(
  {
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<VirtualAccount>("VirtualAccount", VirtualAccountSchema);
