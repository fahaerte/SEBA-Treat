import MealReservation from "@treat/webapp/src/types/interfaces/mealReservation.interface";

export interface SentMealOfferRequestBottomProps {
  mealOfferId: string;
  sellerId: string;
  sellerFirstName: string;
  sellerLastName: string;
  reservation: MealReservation;
  sellerRating: number | undefined;
  sellerMeanRating: number;
}
