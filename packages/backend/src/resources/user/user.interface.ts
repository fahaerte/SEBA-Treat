import { Document } from "mongoose";
import { IUser } from "@treat/lib-common";
import { IAddress } from "@treat/lib-common/lib/interfaces/IAddress";

interface UserDocument extends Document, IUser {
  isValidPassword(password: string): Promise<Error | boolean>;
}

export interface UserWithOptionalAddressDocument extends Omit<UserDocument, "address">{
  address?: IAddress;
}

export default UserDocument;
