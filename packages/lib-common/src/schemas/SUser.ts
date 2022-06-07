import { Schema } from "mongoose";
import { IUser } from "../interfaces";

// TODO: Find out if you really need to add all the descriptive parts since TS interface already implies "more than enough" (regarding type and required)
// --> Only the relations to other schemas should be defined here
// TODO: All in one file?
export const SUser = new Schema<IUser>({
  firstname: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address" },
});
