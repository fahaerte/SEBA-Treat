import UserModel from "../user/user.model";
import token from "../../utils/token";
import path from "path";
import * as fs from "fs";
import VirtualAccountService from "../virtualAccount/virtualAccount.service";
import User from "../user/user.interface";
import { Service } from "typedi";
import { USER_STARTING_BALANCE } from "@treat/lib-common/";
import { ObjectId } from "mongoose";
import {IAddress, IUser} from "@treat/lib-common";
import accountBalanceInsufficientException from "../../utils/exceptions/accountBalanceInsufficient.exception";

@Service()
class UserService {
  private userModel = UserModel;
  private virtualAccountService = new VirtualAccountService();

  /**
   * Register a new user
   */
  public async register(
    newUser: IUser
  ): Promise<{ userId: string; token: string, address: IAddress }> {
    try {
      newUser.virtualAccount = this.virtualAccountService.createAccount(
        USER_STARTING_BALANCE
      );
      const user = await this.userModel.create({
        ...newUser,
        stripeCustomerId: "",
      });
      return { userId: user.id, token: token.createToken(user), address: user.address };
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Attempt to log in a user
   */
  public async login(
    email: string,
    password: string
  ): Promise<{ userId: string; token: string, address: IAddress }> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error("Unable to find user with that email address");
    }

    if (await user.isValidPassword(password)) {
      return { userId: user.id, token: token.createToken(user), address: user.address };
    } else {
      throw new Error("Wrong credentials given");
    }
  }

  public async updateUser(
    user: { _id: string } & Partial<IUser>
  ): Promise<User | null> {
    const { _id, ...updatedUser } = user;
    await this.userModel.findByIdAndUpdate({ _id }, updatedUser);
    return this.userModel.findById(_id);
  }

  public async getUser(userId: string): Promise<Partial<User> | null> {
    return this.userModel
      .findById(userId)
      .select([
        "email",
        "firstName",
        "lastName",
        "address",
        "virtualAccount",
        "brithDate",
        "_id",
      ]);
  }

  /**
   * Attempt to get path to profile picture
   * @param userid
   */
  public getProfilePicturePath(userid: string): string {
    const profilePicturesPath = path.resolve(
      __dirname,
      "../../../profilePictures"
    );
    const picturesList = fs.readdirSync(profilePicturesPath);
    const pictureForId = picturesList.find((element) =>
      element.includes(userid)
    );
    if (!pictureForId) {
      throw new Error("User has no profile picture");
    }
    return path.join(profilePicturesPath, pictureForId);
  }

  public async sendTransaction(
    userId: ObjectId,
    amount: number
  ): Promise<number | Error> {
    const user = (await this.userModel.findById(userId)) as User;
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
    const user = (await this.userModel.findById(userId)) as User;
    user.virtualAccount.balance += amount;
    await user.save();
    return user.virtualAccount.balance;
  }

  public async getAccountBalance(userId: ObjectId): Promise<number | Error> {
    const user = (await this.userModel.findById(userId)) as User;
    return user.virtualAccount.balance;
  }

  public async updateUserRating(
    userId: ObjectId,
    newRating: number
  ): Promise<number | Error> {
    try {
      const user = (await this.userModel.findById(userId)) as User;
      const ratingVolume = user.meanRating * user.countRatings;
      user.countRatings += 1;
      const newMeanRating = (ratingVolume + newRating) / user.countRatings;
      user.meanRating = Math.round(newMeanRating * 100) / 100;
      await user.save();
      return user.meanRating;
    } catch (error) {
      throw new Error("MeanRating of user could not be updated!");
    }
  }
}

export default UserService;
