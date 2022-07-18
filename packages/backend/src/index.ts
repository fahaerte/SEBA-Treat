import "reflect-metadata";
import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import UserController from "./resources/user/user.controller";
import MealOfferController from "./resources/mealOffer/mealOffer.controller";
import MealOfferService from "./resources/mealOffer/mealOffer.service";
import { Container } from "typedi";
import MealTransactionController from "./resources/mealTransaction/mealTransaction.controller";
import UserService from "./resources/user/user.service";
import CreditPackageController from "./resources/creditPackage/creditPackage.controller";
import StripeService from "./resources/stripe/stripe.service";
import StripeController from "./resources/stripe/stripe.controller";
import MealTransactionService from "./resources/mealTransaction/mealTransaction.service";
import RatingController from "./resources/rating/ratingController";
import RatingService from "./resources/rating/ratingService";
import { ConfigService } from "./utils/ConfigService";

validateEnv();

const configService = new ConfigService();
const app = new App(
  [
    new UserController(
      Container.get(UserService),
      Container.get(StripeService)
    ),

    new MealTransactionController(Container.get(MealTransactionService)),
    new MealOfferController(Container.get(MealOfferService)),
    new StripeController(
      Container.get(StripeService),
      Container.get(UserService)
    ),
    new CreditPackageController(),
    new RatingController(Container.get(RatingService)),
  ],
  Number(configService.get("PORT"))
);

app.listen();
