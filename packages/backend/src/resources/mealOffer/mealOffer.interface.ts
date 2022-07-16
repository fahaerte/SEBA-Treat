import { Document, ObjectId } from "mongoose";
import { MealReservationDocument } from "../mealReservation/mealReservation.interface";
import { RatingDocument } from "../rating/rating.interface";
import UserDocument from "../user/user.interface";
import { IMealOffer } from "@treat/lib-common/lib/interfaces/IMealOffer";

export interface MealOfferDocument
  extends Omit<IMealOffer, "_id" | "user" | "reservations" | "rating">,
    Document {
  _id: ObjectId;
  user: ObjectId;
  reservations: MealReservationDocument[];
  rating?: RatingDocument;
}

export interface MealOfferDocumentWithUser
  extends Omit<MealOfferDocument, "user"> {
  user: UserDocument;
}
