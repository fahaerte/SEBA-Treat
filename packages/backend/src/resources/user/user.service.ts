import UserModel from "../user/user.model";
import token from "../../utils/token";
import path from "path";
import * as fs from "fs";
import VirtualAccountService from "../virtualAccount/virtualAccount.service";
import VirtualAccount from "../virtualAccount/virtualAccount.interface";
import User from "../user/user.interface";
import { Service } from "typedi";
import { USER_STARTING_BALANCE } from "@treat/lib-common/src/constants/index";
import { ObjectId, Types } from "mongoose";
import { IUser } from "@treat/lib-common";

@Service()
class UserService {
  private userModel = UserModel;
  // TODO: importing service instead of model right way to do this?
  private virtualAccountService = new VirtualAccountService();

  /**
   * Register a new user
   */
  public async register(
    newUser: IUser
  ): Promise<{ user: User; token: string }> {
    try {
      newUser.virtualAccount = this.virtualAccountService.createAccount(
        USER_STARTING_BALANCE
      );
      const user = await this.userModel.create({
        ...newUser,
        stripeCustomerId: "",
      });
      return { user, token: token.createToken(user) };
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Attempt to log in a user
   */
  public async login(email: string, password: string): Promise<JSON | Error> {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new Error("Unable to find user with that email address");
      }

      if (await user.isValidPassword(password)) {
        const authenticatedUser: JSON = <JSON>(<unknown>{
          user: user,
          token: token.createToken(user),
        });
        return authenticatedUser;
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error) {
      throw new Error("Unable to log in user");
    }
  }

  public async updateUser(
    user: { _id: string } & Partial<IUser>
  ): Promise<User | null> {
    try {
      const { _id, ...updatedUser } = user;
      await this.userModel.findByIdAndUpdate({ _id }, updatedUser);
      return await this.userModel.findById(_id);
    } catch (error) {
      throw new Error("Unable to update user");
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

  public async getAccountBalance(userId: ObjectId): Promise<number | Error> {
    try {
      const user = (await this.userModel.findById(userId)) as User;
      return user.virtualAccount.balance;
    } catch (error) {
      throw new Error("Unable to receive account balance");
    }
  }
}

export default UserService;
