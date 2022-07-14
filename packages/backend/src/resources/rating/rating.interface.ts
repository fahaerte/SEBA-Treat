import { ObjectId } from "mongoose";
import { IRating } from "@treat/lib-common/lib/interfaces/IRating";

export interface RatingDocument extends Omit<IRating, "_id"> {
  _id: ObjectId;
}
