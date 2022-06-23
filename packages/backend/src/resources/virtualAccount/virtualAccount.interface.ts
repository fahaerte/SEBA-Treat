import { Document } from "mongoose";
import { IVirtualAccount } from "@treat/lib-common/src/interfaces/IVirtualAccount";

interface VirtualAccount extends Document, IVirtualAccount {}

export default VirtualAccount;
