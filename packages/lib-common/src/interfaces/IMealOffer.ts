import { IMealReservation } from "./IMealReservation";
import { IRating } from "./IRating";

export interface IMealOffer {
  _id: string;
  title: string;
  description: string;
  user: string;
  categories: string[];
  allergens: string[];
  startDate: Date;
  endDate: Date;
  portions: number;
  pickUpDetails?: string;
  price: number;
  transactionFee: number;
  reservations: IMealReservation[];
  rating?: IRating;
  alergensVerified: boolean;
}
