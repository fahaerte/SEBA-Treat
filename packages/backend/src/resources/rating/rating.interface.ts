import { ObjectId } from "mongoose";
import { IRating } from "@treat/lib-common";

export interface RatingDocument extends Omit<IRating, "_id"> {
  _id: ObjectId;
}
