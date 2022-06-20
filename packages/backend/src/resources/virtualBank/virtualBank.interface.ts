import { Document, ObjectId } from "mongoose";

interface VirtualBank extends Document {
  centralFee: number;
  userStartingBalance: number;
  virtualCentralAccount: ObjectId;
}

export default VirtualBank;
