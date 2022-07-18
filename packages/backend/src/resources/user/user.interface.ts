import { Document } from "mongoose";
import { IUser } from "@treat/lib-common";

interface UserDocument extends Document, IUser {
  isValidPassword(password: string): Promise<Error | boolean>;
}

export default UserDocument;
