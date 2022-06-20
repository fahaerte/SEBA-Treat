import { Document, ObjectId } from "mongoose";
import VirtualAccountType from "./virtualAccountType.enum";

interface VirtualAccount extends Document {
  virtualBankId: ObjectId;
  accountType: VirtualAccountType;
  balance: number;
}

export default VirtualAccount;
