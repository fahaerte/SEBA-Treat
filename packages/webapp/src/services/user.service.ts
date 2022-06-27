import { IUser } from "@treat/lib-common";
import ApiService from "./api.service";

class UserService {
  private static PATH = "/users";

  public static getUser = async (userId: string): Promise<IUser> => {
    const data = await ApiService.get(`${UserService.PATH}/${userId}`);
    return data["data"] as IUser;
  };
}

export default UserService;
