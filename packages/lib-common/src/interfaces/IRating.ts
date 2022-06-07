import { Document } from "mongoose";

import { IUser } from "./IUser";

export interface IRating extends Document {
  stars: number;
  mealTransaction: number;
  author: IUser;
  receiver: IUser;
}
