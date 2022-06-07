import { Types, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  profilePicture: File;
  rating: number;
  address: Types.ObjectId;
}
