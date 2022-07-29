import { baseApi, baseApiAuth } from "./baseApi";
import {
  EMealReservationState,
  ESortingRules,
  IMealOffer,
  IMealReservation,
  IUser,
} from "@treat/lib-common";
import { getCookie } from "../utils/auth/CookieProvider";
import { TOptionValuePair } from "../components";

export interface IMealOfferForm
  extends Omit<
    IMealOffer,
    | "allergens"
    | "categories"
    | "_id"
    | "user"
    | "reservations"
    | "transactionFee"
    | "image"
  > {
  image: FileList;
  allergens: TOptionValuePair[];
  categories: TOptionValuePair[];
}

export interface PopulatedReservations extends Omit<IMealReservation, "buyer"> {
  buyer: Partial<IUser>;
}

export const getMealOffer = async (
  mealOfferId: string,
  compareAddress?: string
) => {
  let response;
  if (compareAddress) {
    response = await baseApiAuth().get(`/meals/${mealOfferId}`, {
      params: {
        compareAddress: compareAddress,
      },
    });
  } else {
    response = await baseApiAuth().get(`/meals/${mealOfferId}`);
  }
  return response.data.data;
};

export const getOwnMealOffers = async () => {
  const response = await baseApiAuth().get(`/meals`);
  return response.data.data;
};

export const requestMealOffer = async ({
  mealOfferId,
}: requestMealOfferArgs) => {
  return await baseApiAuth().post(`/meals/${mealOfferId}/reservations`);
};

export const createMealOffer = async (formData: FormData) => {
  return await baseApiAuth().post("/meals", formData);
};

export const updateMealOffer = async (
  mealOfferId: string,
  updatedMealOffer: FormData
) => {
  return await baseApiAuth().put(`/meals/${mealOfferId}`, updatedMealOffer);
};

export const getMealOffersByParams = async (
  page: number,
  pageLimit: number,
  distance: number,
  portions?: number,
  category?: string,
  allergen?: string[],
  sellerRating?: number,
  price?: number,
  search?: string,
  sortingRule?: ESortingRules | undefined
) => {
  const response = await baseApi().get(`/meals/previews`, {
    params: {
      page: page,
      pageLimit: pageLimit,
      address: getCookie("address"),
      portions: portions,
      category: category,
      sellerRating: sellerRating,
      price: price,
      search: search,
      distance: distance,
      sortingRule: sortingRule?.valueOf(),
      allergen: allergen,
    },
  });
  return response.data;
};

// export const alreadyReserved = async (mealOfferId: string) => {
//   const response = await baseApiAuth().get(
//     `/meals/${mealOfferId}/reservations`
//   );
//   return response.data;
// };

export const getSentMealOfferRequests = async () => {
  const response = await baseApiAuth().get("/meals/reservations/sent");
  return response.data;
};

export const getReceivedMealOfferRequests = async () => {
  const response = await baseApiAuth().get("/meals/reservations/received");
  return response.data;
};

export const updateMealReservationState = async (
  mealOfferReservationId: string,
  newReservationState: EMealReservationState
) => {
  const newStateObject = {
    reservationState: newReservationState,
  };
  const response = await baseApiAuth().patch(
    `/meals/reservations/${mealOfferReservationId}`,
    newStateObject
  );
  return response.data;
};

interface requestMealOfferArgs {
  mealOfferId: string;
}

export interface CreateMealOfferArgs {
  mealOffer: Omit<
    IMealOffer,
    "_id" | "rating" | "transactionFee" | "reservations"
  >;
}
