import { Types } from "mongoose";
import { IAddress } from "./IAddress";

// Interface
export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  // profilePicture: File;
  address: IAddress;
  virtualAccount: IVirtualAccount;
  stripeCustomerId?: string;
  meanRating: number;
  countRatings: number;
}
