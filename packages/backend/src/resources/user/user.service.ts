import UserModel from "../user/user.model";
import token from "../../utils/token";
import path from "path";
import * as fs from "fs";
import VirtualAccountService from "../virtualAccount/virtualAccount.service";
import User from "../user/user.interface";
import { Service } from "typedi";
import { USER_STARTING_BALANCE } from "@treat/lib-common/src/constants/index";
import { ObjectId } from "mongoose";
import { IUser } from "@treat/lib-common";

@Service()
class UserService {
  private userModel = UserModel;
  private virtualAccountService = new VirtualAccountService();

  /**
   * Register a new user
   */
  public async register(newUser: User): Promise<string | Error> {
    try {
      // create account
      newUser.virtualAccount = this.virtualAccountService.createAccount(
        USER_STARTING_BALANCE
      );
      const user = await this.userModel.create(newUser);
      return token.createToken(user);
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Attempt to log in a user
   */
  public async login(email: string, password: string): Promise<string | Error> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new Error("Unable to find user with that email address");
      }

      if (await user.isValidPassword(password)) {
        return token.createToken(user);
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error) {
      throw new Error("Unable to create user");
    }
  }

  public async getUser(userId: string): Promise<IUser | Error> {
    try {
      return (await this.userModel
        .findById(userId)
        .select(["email", "firstName", "lastName"])) as IUser;
    } catch (error) {
      throw new Error("No user found");
    }
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
    try {
      const user = (await this.userModel.findById(userId)) as User;
      user.virtualAccount.balance -= amount;
      await user.save();
      return user.virtualAccount.balance;
    } catch (error) {
      throw new Error("Unable to send transaction");
    }
  }

  public async receiveTransaction(
    userId: ObjectId,
    amount: number
  ): Promise<number | Error> {
    try {
      const user = (await this.userModel.findById(userId)) as User;
      user.virtualAccount.balance += amount;
      await user.save();
      return user.virtualAccount.balance;
    } catch (error) {
      throw new Error("Unable to receive transaction");
    }
  }
}

export default UserService;
