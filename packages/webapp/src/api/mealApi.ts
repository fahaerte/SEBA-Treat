import { baseApi, baseApiAuth } from "./baseApi";
import {
  EMealReservationState,
  ESortingRules,
  IMealOffer,
} from "@treat/lib-common";
import { getCookie } from "../utils/auth/CookieProvider";

export const getMealOffer = async (
  mealOfferId: string,
  compareAddress?: string
) => {
  const token = getCookie("userId");
  console.log(token);
  let api = baseApi();
  if (token) api = baseApiAuth();
  let response;
  if (compareAddress) {
    response = await api.get(`/mealOffers/${mealOfferId}`, {
      params: {
        compareAddress: compareAddress,
      },
    });
  } else {
    response = await api.get(`/mealOffers/${mealOfferId}`);
  }
  return response.data.data;
};

export const requestMealOffer = async ({
  mealOfferId,
}: requestMealOfferArgs) => {
  return await baseApiAuth().post(`/mealOffers/${mealOfferId}/reservations`);
};

export const createMealOffer = async (formData: FormData) => {
  return await baseApiAuth().post("/mealOffers", formData);
};

export const updateMealOffer = async (
  mealOfferId: string,
  updatedMealOffer: FormData
) => {
  return await baseApiAuth().put(
    `/mealOffers/${mealOfferId}`,
    updatedMealOffer
  );
};

export const getMealOffersByParams = async (
  page: number,
  pageLimit: number,
  distance: number,
  portions?: number,
  category?: string,
  allergen?: string,
  sellerRating?: number,
  price?: number,
  search?: string,
  sortingRule?: ESortingRules | undefined
) => {
  const response = await baseApi().get(`/mealOffers/previews`, {
    params: {
      page: page,
      pageLimit: pageLimit,
      address: getCookie("address"),
      portions: portions,
      category: category,
      allergen: allergen,
      sellerRating: sellerRating,
      price: price,
      search: search,
      distance: distance,
      sortingRule: sortingRule?.valueOf(),
    },
  });
  return response.data;
};

// export const alreadyReserved = async (mealOfferId: string) => {
//   const response = await baseApiAuth().get(
//     `/mealOffers/${mealOfferId}/reservations`
//   );
//   return response.data;
// };

export const getSentMealOfferRequests = async () => {
  const response = await baseApiAuth().get("/mealOffers/reservations/sent");
  return response.data;
};

export const getReceivedMealOfferRequests = async () => {
  const response = await baseApiAuth().get("/mealOffers/reservations/received");
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
    `/mealOffers/reservations/${mealOfferReservationId}`,
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
