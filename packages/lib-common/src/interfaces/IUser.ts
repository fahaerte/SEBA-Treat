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

/**
 * Schema: structure of a particular document (complete or partial)
 */
export const SUser = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthdate: { type: Date, required: true },
  rating: { type: Number, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
});

/**
 * Model: interface to interact with database
 */
export const MUser: Model<IUser> = model("User", SUser);
