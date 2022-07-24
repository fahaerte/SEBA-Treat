import UserModel from "../user/user.model";
<<<<<<< packages/backend/src/resources/user/user.service.ts
import token from "../../utils/token";
import token from "../../utils/tokenUtil";
import path from "path";
import * as fs from "fs";
import VirtualAccountService from "../virtualAccount/virtualAccount.service";
import UserDocument from "../user/user.interface";
import { Service } from "typedi";
import { ObjectId } from "mongoose";
import { IAddress, IUser, USER_STARTING_BALANCE } from "@treat/lib-common";
import accountBalanceInsufficientException from "../../utils/exceptions/accountBalanceInsufficient.exception";
import UserNotFoundException from "../../utils/exceptions/userNotFound.exception";
import Logger, { ILogMessage } from "../../utils/logger";

@Service()
class UserService {
  private userModel = UserModel;

  constructor(private readonly virtualAccountService: VirtualAccountService) {}

  /**
   * Register a new user
   */
  public async register(
    newUser: IUser
  ): Promise<{ userId: string; token: string; address: IAddress }> {
    try {
      newUser.virtualAccount = this.virtualAccountService.createAccount(
        USER_STARTING_BALANCE
      );
      const user = await this.userModel.create({
        ...newUser,
        stripeCustomerId: "",
      });
      return {
        userId: user.id,
        token: token.createToken(user),
        address: user.address,
      };
    } catch (error: any) {
      Logger.error({
        functionName: "register",
        message: "Could not create user",
        details: error.message,
      } as ILogMessage);
      throw new Error(error.message as string);
    }
  }

  /**
   * Attempt to log in a user
   */
  public async login(
    email: string,
    password: string
  ): Promise<{ userId: string; token: string; address: IAddress }> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UserNotFoundException(
        "Unable to find user with that email address"
      );
    }

    if (await user.isValidPassword(password)) {
      Logger.info({
        functionName: "login",
        message: "User logged in",
        details: `User ${user._id}`,
      } as ILogMessage);
      return {
        userId: user.id,
        token: token.createToken(user),
        address: user.address,
      };
    } else {
      Logger.error({
        functionName: "login",
        message: "Invalid password",
      } as ILogMessage);
      throw new Error("Wrong credentials given");
    }
  }

  public async updateUser(
    user: { _id: string } & Partial<IUser>
  ): Promise<UserDocument | null> {
    const { _id, ...updatedUser } = user;
    await this.userModel.findByIdAndUpdate({ _id }, updatedUser);
    return this.userModel.findById(_id);
  }

  public async getUser(userId: string): Promise<Partial<UserDocument> | null> {
    return this.userModel
      .findById(userId)
      .select([
        "email",
        "stripeCustomerId",
        "firstName",
        "lastName",
        "address",
        "virtualAccount",
        "brithDate",
        "meanRating",
        "countRatings",
        "_id",
      ]);
  }

  public async getUserPreview(
    userId: string
  ): Promise<Partial<UserDocument> | null> {
    return this.userModel
      .findById(userId)
      .select(["firstName", "meanRating", "countRatings"]);
  }

  public async sendTransaction(
    userId: ObjectId,
    amount: number
  ): Promise<number | Error> {
    const user = (await this.userModel.findById(userId)) as UserDocument;
    const newBalance = user.virtualAccount.balance - amount;
    if (newBalance >= 0) {
      user.virtualAccount.balance -= amount;
      await user.save();
    } else {
      throw new accountBalanceInsufficientException(
        userId as unknown as string
      );
    }
    return user.virtualAccount.balance;
  }

  public async receiveTransaction(
    userId: ObjectId,
    amount: number
  ): Promise<number | Error> {
    const user = (await this.userModel.findById(userId)) as UserDocument;
    user.virtualAccount.balance += amount;
    await user.save();
    return user.virtualAccount.balance;
  }

  public async getAccountBalance(userId: ObjectId): Promise<number | Error> {
    const user = (await this.userModel.findById(userId)) as UserDocument;
    return user.virtualAccount.balance;
  }
}

export default UserService;
