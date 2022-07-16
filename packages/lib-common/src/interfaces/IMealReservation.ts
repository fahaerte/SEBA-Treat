import { EMealReservationState } from "../enums";

export interface IMealReservation {
  _id: string;
  buyer: string;
  reservationState: EMealReservationState;
}
