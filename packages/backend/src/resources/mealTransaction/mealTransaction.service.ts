import { ObjectId } from "mongoose";
import MealTransactionModel from "./mealTransaction.model";
import MealTransaction from "./mealTransaction.interface";
import MealTransactionState from "./mealTransactionState.enum";
import VirtualAccountService from "../virtualAccount/virtualAccount.service";
import VirtualCentralAccountService from "../virtualCentralAccount/virtualCentralAccount.service";

class MealTransactionService {
  private mealTransactionModel = MealTransactionModel;
  private virtualAccountService = new VirtualAccountService();
  private virtualCentralAccountService = new VirtualCentralAccountService();

  /**
   * Create a new transaction
   */
  public async createTransaction(
    mealOfferId: ObjectId,
    mealReservationId: ObjectId,
    senderId: ObjectId,
    receiverId: ObjectId
  ): Promise<MealTransaction | Error> {
    try {
      const transactionState = MealTransactionState.COMPLETED;
      return await this.mealTransactionModel.create({
        mealOfferId,
        mealReservationId,
        senderId,
        receiverId,
      });
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Perform transaction
   */
  public async performTransaction(
    mealTransactionId: ObjectId
  ): Promise<MealTransaction | Error> {
    try {
      // TODO: check if user is authorized to perform transaction -> where to do that
      const transaction = (await this.mealTransactionModel.findById(
        mealTransactionId
      )) as MealTransaction;
      if (transaction.transactionState === MealTransactionState.PENDING) {
        // TODO: check if concurrency is handled correctly

        // TODO: get price from meal offer
        const price = 14;
        const fee = 2;

        // update sender account
        await this.virtualAccountService.sendTransaction(
          transaction.senderId,
          price
        );

        // update receiver account
        await this.virtualAccountService.receiveTransaction(
          transaction.receiverId,
          price
        );

        // update central account
        await this.virtualCentralAccountService.receiveTransaction(fee);

        // update transaction state
        await this.mealTransactionModel.findByIdAndUpdate(
          { _id: mealTransactionId },
          { transactionState: MealTransactionState.COMPLETED }
        );

        return (await this.mealTransactionModel.findById(
          mealTransactionId
        )) as MealTransaction;
      } else {
        return transaction;
      }
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }
}

export default MealTransactionService;
