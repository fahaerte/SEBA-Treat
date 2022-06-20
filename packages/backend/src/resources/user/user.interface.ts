import { Document } from "mongoose";
import { IUser } from "@treat/lib-common";

interface User extends Document, IUser {
  isValidPassword(password: string): Promise<Error | boolean>;
}

export default User;
