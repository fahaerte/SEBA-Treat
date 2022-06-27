import ApiService from "./api.service";
import MealReservationState from "../types/enums/mealReservationState.enum";
import MealOffer from "../types/interfaces/mealOffer.interface";

class MealOfferService {
    private static PATH = "/mealOffers";

    public static getSentMealOfferRequests = async (): Promise<MealOffer[]> => {
        const data = await ApiService.get(`${MealOfferService.PATH}/reservations/sent`);
        return data["data"] as MealOffer[];
    }

    public static getReceivedMealOfferRequests = async (): Promise<MealOffer[]> => {
        const data = await ApiService.get(`${MealOfferService.PATH}/reservations/received`);
        return data["data"] as MealOffer[];
    }

    public static updateMealReservationState = async (
        mealOfferId: string,
        mealOfferReservationId: string,
        newState: MealReservationState,
    ): Promise<void | Error> => {
        const newStateObject = {
            reservationState: newState
        };
        const data = await ApiService.put(`${MealOfferService.PATH}/${mealOfferId}/reservations/${mealOfferReservationId}`, newStateObject);
        console.log(data);
    }

}

export default MealOfferService;