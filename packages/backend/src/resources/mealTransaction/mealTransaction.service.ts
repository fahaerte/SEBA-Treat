import { ObjectId } from "mongoose";
import MealTransactionModel from "./mealTransaction.model";
import MealTransaction from "./mealTransaction.interface";
import MealTransactionState from "./mealTransactionState.enum";
import VirtualAccountService from "../virtualAccount/virtualAccount.service";
import VirtualBankService from "../virtualBank/virtualBank.service";

class MealTransactionService {
  private mealTransactionModel = MealTransactionModel;
  private virtualAccountService = new VirtualAccountService();
  private virtualBankService = new VirtualBankService();

  /**
   * Create a new transaction
   */
  public async createTransaction(
    mealReservation: ObjectId,
    senderAccount: ObjectId,
    receiverAccount: ObjectId
  ): Promise<MealTransaction | Error> {
    try {
      return await this.mealTransactionModel.create({
        mealReservation,
        senderAccount,
        receiverAccount,
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

        // update sender account
        await this.virtualAccountService.sendTransaction(
          transaction.senderAccount,
          price
        );

        // update receiver account
        await this.virtualAccountService.receiveTransaction(
          transaction.receiverAccount,
          price
        );

        // update central account
        const centralBankId = process.env[
          "CENTRAL_BANK_ID"
        ] as unknown as ObjectId;
        const centralAccountId =
          (await this.virtualBankService.getVirtualCentralAccount(
            centralBankId
          )) as ObjectId;
        const fee = (await this.virtualBankService.getCentralFee(
          centralBankId
        )) as number;
        await this.virtualAccountService.receiveTransaction(
          centralAccountId,
          price * fee
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
        return transaction;
      }
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Rate transaction (add rating)
   */
  public async rateBuyer(
    transactionId: ObjectId,
    stars: number
  ): Promise<MealTransaction | Error> {
    try {
      const transaction = (await this.mealTransactionModel.findById(
        transactionId
      )) as MealTransaction;
      if (transaction.transactionState === MealTransactionState.COMPLETED) {
        transaction.buyerRating = stars;
      }
      return transaction;
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }
}

export default MealTransactionService;
