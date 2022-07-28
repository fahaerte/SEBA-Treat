import { IMealReservation } from "./IMealReservation";
import { IRating } from "./IRating";
import { IMealOfferCard } from "./IMealOfferCard";

export interface IMealOffer
  extends Omit<IMealOfferCard, "rating" | "image" | "distance"> {
  image: string;
  description: string;
  pickUpDetails?: string;
  transactionFee: number;
  reservations: IMealReservation[];
  rating?: IRating;
  distance?: number;
}
