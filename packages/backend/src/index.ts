import "reflect-metadata";
import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import UserController from "./resources/user/user.controller";
import MealOfferController from "./resources/mealOffer/mealOffer.controller";
import MealCategoryController from "./resources/mealCategory/mealCategory.controller";
import MealOfferService from "./resources/mealOffer/mealOffer.service";
import {Container} from "typedi";
import MealCategoryService from "./resources/mealCategory/mealCategory.service";
import MealAllergenService from "./resources/mealAllergen/mealAllergen.service";
import MealAllergenController from "./resources/mealAllergen/mealAllergen.controller";
import MealReservationController from "./resources/mealReservation/mealReservation.controller";
import MealReservationService from "./resources/mealReservation/mealReservation.service";

validateEnv();

const app = new App([
        new UserController(),
        new MealOfferController(Container.get(MealOfferService)),
        new MealCategoryController(Container.get(MealCategoryService)),
        new MealAllergenController(Container.get(MealAllergenService)),
        new MealReservationController(Container.get(MealReservationService))
    ],
    Number(process.env.PORT));

app.listen();
