import { Model, model } from "mongoose";
import { SUser } from "../schemas";
import { IUser } from "../interfaces";

export const MUser: Model<IUser> = model("User", SUser);
