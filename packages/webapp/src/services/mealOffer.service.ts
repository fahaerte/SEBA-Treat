import ApiService from "./api.service";
import MealOffer from "../types/interfaces/mealOffer.interface";
import { EMealReservationState } from "@treat/lib-common";

class MealOfferService {
  private static PATH = "/mealOffers";

  public static getSentMealOfferRequests = async (): Promise<MealOffer[]> => {
    const response = await ApiService.get(
      `${MealOfferService.PATH}/reservations/sent`
    );
    const data = await response.json();
    return data["data"] as MealOffer[];
  };

  public static getReceivedMealOfferRequests = async (): Promise<
    MealOffer[]
  > => {
    const response = await ApiService.get(
      `${MealOfferService.PATH}/reservations/received`
    );
    const data = await response.json();
    return data["data"] as MealOffer[];
  };

  public static updateMealReservationState = async (
    mealOfferId: string,
    mealOfferReservationId: string,
    newReservationState: EMealReservationState
  ): Promise<void | Error> => {
    const newStateObject = {
      reservationState: newReservationState,
    };
    const data = await ApiService.patch(
      `${MealOfferService.PATH}/${mealOfferId}/reservations/${mealOfferReservationId}`,
      newStateObject
    );
  };
}

export default MealOfferService;
