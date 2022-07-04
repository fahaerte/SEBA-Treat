import { IAddress } from "./IAddress";
import { IVirtualAccount } from "./IVirtualAccount";

// Interface
export interface IUser {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  // profilePicture: File;
  // rating: number;
  address: IAddress;
  virtualAccount: IVirtualAccount;
}
