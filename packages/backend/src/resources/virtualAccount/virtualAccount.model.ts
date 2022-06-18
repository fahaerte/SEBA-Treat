import { model, Schema, Types } from "mongoose";
import VirtualAccount from "./virtualAccount.interface";
import VirtualAccountTypeEnum from "./virtualAccountType.enum";
import VirtualAccountType from "./virtualAccountType.enum";

const VirtualAccountSchema = new Schema<VirtualAccount>(
  {
    virtualBankId: {
      type: Types.ObjectId,
      required: true,
    },
    accountType: {
      type: String,
      enum: Object.keys(VirtualAccountTypeEnum),
      required: true,
      default: VirtualAccountType.USER_ACCOUNT,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<VirtualAccount>("VirtualAccount", VirtualAccountSchema);
