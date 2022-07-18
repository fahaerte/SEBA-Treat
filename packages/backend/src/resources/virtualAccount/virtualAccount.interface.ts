import { Document } from "mongoose";
import { IVirtualAccount } from "@treat/lib-common";

interface VirtualAccount extends Document, IVirtualAccount {}

export default VirtualAccount;
