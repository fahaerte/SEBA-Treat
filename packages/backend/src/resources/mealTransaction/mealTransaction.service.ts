import { ObjectId } from "mongoose";
import MealTransactionModel from "./mealTransaction.model";
import { MealTransactionDocument } from "./mealTransaction.interface";
import VirtualCentralAccountService from "../virtualCentralAccount/virtualCentralAccount.service";
import UserService from "../user/user.service";
import TransactionNotFoundException from "../../utils/exceptions/transactionNotFound.exception";
import TransactionInWrongStateException from "../../utils/exceptions/transactionInWrongState.exception";
import UserDocument from "../user/user.interface";
import { Service } from "typedi";
import { ETransactionState } from "@treat/lib-common";

@Service()
class MealTransactionService {
  private mealTransactionModel = MealTransactionModel;

  constructor(
    private readonly virtualCentralAccountService: VirtualCentralAccountService,
    private readonly userService: UserService
  ) {}

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
  ): Promise<MealTransactionDocument | Error> {
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
  ): Promise<MealTransactionDocument[] | Error> {
    return this.mealTransactionModel.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });
  }

  /**
   * Perform transaction
   */
  public async performTransaction(
    mealTransactionId: ObjectId
  ): Promise<MealTransactionDocument | Error> {
    const mealTransaction = (await this.mealTransactionModel.findById(
      mealTransactionId
    )) as MealTransactionDocument;
    if (mealTransaction.transactionState === ETransactionState.PENDING) {
      const price = mealTransaction.amount;
      const fee = mealTransaction.transactionFee;

      // update sender account
      await this.userService.sendTransaction(
        mealTransaction.senderId.toString(),
        price
      );

      // update receiver account
      await this.userService.receiveTransaction(
        mealTransaction.receiverId.toString(),
        price
      );

      // update central account
      await this.virtualCentralAccountService.receiveTransaction(fee);

      // update transaction state
      await this.mealTransactionModel.findByIdAndUpdate(
        { _id: mealTransactionId },
        { transactionState: ETransactionState.COMPLETED }
      );

      return (await this.mealTransactionModel.findById(
        mealTransactionId
      )) as MealTransactionDocument;
    } else {
      return mealTransaction;
    }
  }

  public async rateTransaction(
    user: UserDocument,
    mealOfferId: string,
    rating: number
  ): Promise<void | Error> {
    const transaction = (await this.mealTransactionModel.findOne({
      mealOfferId: mealOfferId,
      $or: [{ senderId: user._id }, { receiverId: user._id }],
    })) as MealTransactionDocument;
    if (!transaction) {
      throw new TransactionNotFoundException(mealOfferId);
    }
    if (transaction.transactionState !== ETransactionState.COMPLETED) {
      throw new TransactionInWrongStateException(
        transaction._id as unknown as string
      );
    }
    if (user._id.equals(transaction.senderId)) {
      if (transaction.sellerRating === undefined) {
        transaction.sellerRating = rating;
      } else {
        throw new Error("The transaction already has a sellerRating");
      }
    } else {
      if (transaction.buyerRating === undefined) {
        transaction.buyerRating = rating;
      } else {
        throw new Error("The transaction already has a buyerRating");
      }
    }
    await transaction.save();
  }
}

export default MealTransactionService;
