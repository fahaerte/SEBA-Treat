import { Document, ObjectId } from "mongoose";
import { IMealOffer } from "@treat/lib-common/src/interfaces/IMealOffer";
import { MealReservationDocument } from "../mealReservation/mealReservation.interface";
import { RatingDocument } from "../rating/rating.interface";

export interface MealOfferDocument
  extends Omit<IMealOffer, "_id" | "user" | "reservations" | "rating">,
    Document {
  _id: ObjectId;
  user: ObjectId;
  reservations: MealReservationDocument[];
  rating?: RatingDocument;
}
