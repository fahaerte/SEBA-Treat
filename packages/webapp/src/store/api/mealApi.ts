import { emptyApi as api } from "../emptyApi";
import {
  MealControllerGetMealByIdResponse,
  MealControllerCreateResponse,
  MealControllerGetMealByIdArgs,
  MealControllerCreateArgs,
} from "./types";

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

export const {
  useMealControllerGetByIdQuery,
  useMealControllerCreateMutation,
} = injectedMealRtkApi;

export { injectedMealRtkApi as mealApi };
