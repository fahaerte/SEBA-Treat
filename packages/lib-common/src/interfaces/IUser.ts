import { Types } from "mongoose";
import { IAddress } from "./IAddress";

// Interface
export interface IUser {
  email: string;
  password: string;
  // username: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  // profilePicture: File;
  // rating: number;
  address: IAddress;
  virtualAccountId: Types.ObjectId;
}
