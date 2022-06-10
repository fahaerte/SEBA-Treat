import { model, Schema, Document } from "mongoose";
import { IUser } from "@treat/lib-common";

interface IUserModel extends IUser, Document {}
/**
 * Schema: structure of a particular document (complete or partial)
 */
export const SUser = new Schema<IUserModel>({
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
export default model("User", SUser);
