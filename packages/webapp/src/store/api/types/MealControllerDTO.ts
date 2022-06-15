import { IMealOffer } from "@treat/lib-common";

/** 200 status code */
export type MealControllerGetMealByIdResponse = IMealOffer;
export type MealControllerGetMealByIdArgs = { id: string };

export type MealControllerCreateResponse = IMealOffer;
export type MealControllerCreateArgs = IMealOffer;
