import { IUser, IUserCredentials } from "@treat/lib-common";
import ApiService from "./api.service";

class UserService {
  private static PATH = "/users";

  public static getUser = async (userId: string): Promise<IUser> => {
    const response = await ApiService.get(`${UserService.PATH}/${userId}`);
    const data = await response.json();
    return data["data"] as IUser;
  };

  public static getProfilePictureURL = async (
    userId: string
  ): Promise<string> => {
    const response = await ApiService.getImage(
      `${UserService.PATH}/profile-picture/${userId}`
    );
    return URL.createObjectURL(await response.blob());
  };

  public static loginUser = async (
    credentials: IUserCredentials
  ): Promise<Response | Error> => {
    return await ApiService.post(`${UserService.PATH}/login`, credentials);
  };

  public static registerUser = async (
    user: IUser
  ): Promise<Response | Error> => {
    return await ApiService.post(`${UserService.PATH}/login`, user);
  };

  public static getAccountBalance = async (): Promise<string> => {
    const response = await ApiService.get(
      `${UserService.PATH}/account-balance`
    );
    const data = await response.json();
    return data.accountBalance;
  };
}

export default UserService;
