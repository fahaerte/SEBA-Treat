import { ObjectId } from "mongoose";
import { EMealReservationState } from "../enums";

export interface IMealOfferReservation {
  buyer: ObjectId;
  reservationState: EMealReservationState;
}
