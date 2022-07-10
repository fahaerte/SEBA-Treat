import { emptyApi as api } from "../emptyApi";
import { IMealOffer } from "@treat/lib-common";
import MealOffer from "../../types/interfaces/mealOffer.interface";

const PATH = "/mealOffers";

const injectedMealRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    mealOfferSentReservations: build.query<
      MealOffer[],
        undefined
    >({
      query: () => ({
        url: `${PATH}/reservations/sent`,
        method: "GET",
      }),
    }),
    mealControllerCreate: build.mutation<
      MealControllerCreateResponse,
      MealControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/meals/`,
        method: "POST",
        body: queryArg,
      }),
    }),
  }),
});

/** 200 status code */
export type MealControllerGetMealByIdResponse = MealOffer;
export type MealControllerGetMealByIdArgs = { id: string };

export type MealControllerCreateResponse = IMealOffer;
export type MealControllerCreateArgs = IMealOffer;

export const {
  useMealOfferSentReservationsQuery,
  useMealControllerCreateMutation,
} = injectedMealRtkApi;

export { injectedMealRtkApi as mealApi };
