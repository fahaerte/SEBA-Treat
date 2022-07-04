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
  ): Promise<string | Error> => {
    const response = await ApiService.post(
      `${UserService.PATH}/login`,
      credentials
    );
    const data = await response.json();
    return data["authenticatedUser"];
  };

  public static registerUser = async (
    user: IUser
  ): Promise<string | Error> => {
    const response = await ApiService.post(`${UserService.PATH}/register`, user);
    const data = await response.json();
    return data["authenticatedUser"];
  };
}

export default UserService;
