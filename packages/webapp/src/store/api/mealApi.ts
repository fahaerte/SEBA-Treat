import { emptyApi as api } from "../emptyApi";
import { IMealOffer } from "@treat/lib-common";

const injectedMealRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    mealControllerGetById: build.query<
      MealControllerGetMealByIdResponse,
      MealControllerGetMealByIdArgs
    >({
      query: (queryArg) => ({
        url: `/api/meals/${queryArg.id}`,
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
export type MealControllerGetMealByIdResponse = IMealOffer;
export type MealControllerGetMealByIdArgs = { id: string };

export type MealControllerCreateResponse = IMealOffer;
export type MealControllerCreateArgs = IMealOffer;

export const {
  useMealControllerGetByIdQuery,
  useMealControllerCreateMutation,
} = injectedMealRtkApi;

export { injectedMealRtkApi as mealApi };
