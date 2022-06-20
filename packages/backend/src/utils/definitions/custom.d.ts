import User from "../../resources/user/user.interface";
import VirtualAccount from "../../resources/virtualAccount/virtualAccount.interface";
import VirtualBank from "../../resources/virtualBank/virtualBank.interface";
import MealTransaction from "../../resources/mealTransaction/mealTransaction.interface";

declare global {
  namespace Express {
    export interface Request {
      user: User;
      virtualAccount: VirtualAccount;
      virtualBank: VirtualBank;
      mealTransaction: MealTransaction;
    }
  }
}
