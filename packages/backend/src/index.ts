import "reflect-metadata";
import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import UserController from "./resources/user/user.controller";
import MealOfferController from "./resources/mealOffer/mealOffer.controller";
import MealOfferService from "./resources/mealOffer/mealOffer.service";
import { Container } from "typedi";
import MealAllergenController from "./resources/mealAllergen/mealAllergen.controller";
import MealCategoryController from "./resources/mealCategory/mealCategory.controller";

validateEnv();

const app = new App(
  [
    new UserController(),
    new MealOfferController(Container.get(MealOfferService)),
    new MealAllergenController(),
    new MealCategoryController(),
  ],
  Number(process.env.PORT)
);

app.listen();
