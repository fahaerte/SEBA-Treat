import "dotenv/config";
import "module-alias/register";
import validateEnv from "./utils/validateEnv";
import App from "./app";
import UserController from "./resources/user/user.controller";
import VirtualAccountController from "./resources/virtualAccount/virtualAccount.controller";
import MealTransactionController from "./resources/mealTransaction/mealTransaction.controller";
import VirtualBankController from "./resources/virtualBank/virtualBank.controller";

validateEnv();

const app = new App(
  [
    new UserController(),
    new VirtualBankController(),
    new VirtualAccountController(),
    new MealTransactionController(),
  ],
  Number(process.env.PORT)
);

app.listen();
