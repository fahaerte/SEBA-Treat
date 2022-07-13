import { ObjectId } from "mongoose";
import MealTransactionModel from "./mealTransaction.model";
import MealTransaction from "./mealTransaction.interface";
import MealTransactionState from "./mealTransactionState.enum";
import VirtualCentralAccountService from "../virtualCentralAccount/virtualCentralAccount.service";
import UserService from "../user/user.service";
import MealTransactionParticipant from "./mealTransactionParticipant.enum";
import TransactionNotFoundException from "../../utils/exceptions/transactionNotFound.exception";
import TransactionInWrongStateException from "../../utils/exceptions/transactionInWrongState.exception";
import UserDocument from "../user/user.interface";
import { Service } from "typedi";

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
    const mealTransaction = (await this.mealTransactionModel.findById(
      mealTransactionId
    )) as MealTransaction;
    if (mealTransaction.transactionState === MealTransactionState.PENDING) {
      const price = mealTransaction.amount;
      const fee = mealTransaction.transactionFee;

      // update sender account
      await this.userService.sendTransaction(mealTransaction.senderId, price);

      // update receiver account
      await this.userService.receiveTransaction(
        mealTransaction.receiverId,
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
    })) as MealTransaction;
    if (!transaction) {
      throw new TransactionNotFoundException(mealOfferId);
    }
    if (transaction.transactionState !== MealTransactionState.COMPLETED) {
      throw new TransactionInWrongStateException(transaction._id as string);
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

  public async rateTransactionParticipant(
    user: UserDocument,
    transactionId: ObjectId,
    stars: number,
    participantType: MealTransactionParticipant
  ): Promise<MealTransaction | Error> {
    try {
      const transaction = (await this.mealTransactionModel.findById(
        transactionId
      )) as MealTransaction;
      if (!transaction) {
        throw new TransactionNotFoundException(
          transactionId as unknown as string
        );
      }
      if (transaction.transactionState === MealTransactionState.COMPLETED) {
        if (participantType === MealTransactionParticipant.BUYER) {
          if (user._id.equals(transaction.receiverId)) {
            transaction.buyerRating = stars;
          } else {
            throw new Error("Only the seller can rate the buyer.");
          }
        } else {
          if (user._id.equals(transaction.senderId)) {
            transaction.sellerRating = stars;
          } else {
            throw new Error("Only the buyer can rate the seller.");
          }
        }
        transaction.sellerRating = stars;
        await transaction.save();
        return transaction;
      } else {
        throw new TransactionInWrongStateException(transaction.id);
      }
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }
}

export default MealTransactionService;
