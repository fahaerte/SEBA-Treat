import { IAddress } from "./IAddress";
import { IVirtualAccount } from "./IVirtualAccount";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  profilePicture: string;
  address: IAddress;
  virtualAccount: IVirtualAccount;
  stripeCustomerId?: string;
  meanRating: number;
  countRatings: number;
}
