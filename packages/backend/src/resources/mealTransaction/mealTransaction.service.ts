import { ObjectId } from "mongoose";
import MealTransactionModel from "./mealTransaction.model";
import MealTransaction from "./mealTransaction.interface";
import MealTransactionState from "./mealTransactionState.enum";
import VirtualCentralAccountService from "../virtualCentralAccount/virtualCentralAccount.service";
import UserService from "../user/user.service";

class MealTransactionService {
  private mealTransactionModel = MealTransactionModel;
  private virtualCentralAccountService = new VirtualCentralAccountService();
  private userService = new UserService();

  /**
   * Create a new transaction
   */
  public async createTransaction(
    mealOfferId: ObjectId,
    mealReservationId: ObjectId,
    senderId: ObjectId,
    receiverId: ObjectId,
    amount: number,
    transactionFee: number
  ): Promise<MealTransaction | Error> {
    try {
      return await this.mealTransactionModel.create({
        mealOfferId,
        mealReservationId,
        senderId,
        receiverId,
        amount,
        transactionFee,
      });
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Get all transactions (sent and received) for a specific user
   */
  public async getMealTransactions(
    userId: ObjectId
  ): Promise<MealTransaction[] | Error> {
    return this.mealTransactionModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });
  }

  /**
   * Perform transaction
   */
  public async performTransaction(
    mealTransactionId: ObjectId
  ): Promise<MealTransaction | Error> {
    try {
      const mealTransaction = (await this.mealTransactionModel.findById(
        mealTransactionId
      )) as MealTransaction;
      if (mealTransaction.transactionState === MealTransactionState.PENDING) {
        const price = mealTransaction.amount;
        const fee = mealTransaction.transactionFee;

        // update central account
        await this.virtualCentralAccountService.receiveTransaction(fee);

        // update sender account
        await this.userService.sendTransaction(mealTransaction.senderId, price);

        // update receiver account
        await this.userService.receiveTransaction(
          mealTransaction.receiverId,
          price
        );

        // update transaction state
        await this.mealTransactionModel.findByIdAndUpdate(
          { _id: mealTransactionId },
          { transactionState: MealTransactionState.COMPLETED }
        );

        return (await this.mealTransactionModel.findById(
          mealTransactionId
        )) as MealTransaction;
      } else {
        return mealTransaction;
      }
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }
}

export default MealTransactionService;
