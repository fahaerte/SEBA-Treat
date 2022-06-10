import { Types, Schema, Model, model } from "mongoose";

// Interface
export interface IUser {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  profilePicture: File;
  rating: number;
  address: Types.ObjectId;
}
