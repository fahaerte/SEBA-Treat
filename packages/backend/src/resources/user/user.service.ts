import UserModel from "./user.model";
import token from "../../utils/token";
import path from "path";
import * as fs from "fs";
import VirtualAccountService from "../virtualAccount/virtualAccount.service";
import VirtualAccount from "@/resources/virtualAccount/virtualAccount.interface";
import { ObjectId, Types } from "mongoose";

class UserService {
  private userModel = UserModel;
  // TODO: importing service instead of model right way to do this?
  private virtualAccountService = new VirtualAccountService();

  /**
   * Register a new user
   */
  public async register(
    name: string,
    email: string,
    password: string
  ): Promise<string | Error> {
    try {
      const virtualAccount = (await this.virtualAccountService.createAccount(
        process.env["CENTRAL_BANK_ID"] as unknown as ObjectId
      )) as VirtualAccount;
      const virtualAccountId = virtualAccount._id as Types.ObjectId;
      const user = await this.userModel.create({
        name,
        email,
        password,
        virtualAccountId,
      });
      return token.createToken(user);
    } catch (error: any) {
      throw new Error(error.message as string);
    }
  }

  /**
   * Attempt to login a user
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
}

export default UserService;
