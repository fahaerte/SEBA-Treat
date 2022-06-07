import { Types } from "mongoose";

export interface IRating {
  stars: number;
  mealTransaction: number;
  author: Types.ObjectId;
  receiver: Types.ObjectId;
}
