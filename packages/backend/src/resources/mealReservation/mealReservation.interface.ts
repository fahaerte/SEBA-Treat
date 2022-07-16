import { ObjectId } from "mongoose";
import { IMealReservation } from "@treat/lib-common/lib/interfaces/IMealReservation";

export interface MealReservationDocument
  extends Omit<IMealReservation, "_id" | "buyer"> {
  _id: ObjectId;
  buyer: ObjectId;
}
