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
import VirtualAccountController from "./resources/virtualAccount/virtualAccount.controller";
import MealTransactionController from "./resources/mealTransaction/mealTransaction.controller";
import VirtualBankController from "./resources/virtualBank/virtualBank.controller";
import MealCategoryController from "./resources/mealCategory/mealCategory.controller";
import UserService from "./resources/user/user.service";
import StripeService from "./resources/stripe/stripe.service";
import StripeController from "./resources/stripe/stripe.controller";

validateEnv();

const app = new App(
  [
    new UserController(
      Container.get(UserService),
      Container.get(StripeService)
    ),

    new VirtualBankController(),
    new VirtualAccountController(),
    new MealTransactionController(),

    new MealOfferController(Container.get(MealOfferService)),
    new MealAllergenController(),
    new MealCategoryController(),
    new StripeController(Container.get(StripeService)),
  ],
  Number(process.env.PORT)
);

app.listen();
