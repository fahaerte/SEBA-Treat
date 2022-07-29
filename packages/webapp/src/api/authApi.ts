import { baseApi } from "./baseApi";
import { IUser, IUserCredentials } from "@treat/lib-common";

export const login = async (credentials: IUserCredentials) => {
  return await baseApi().post("/users/login", credentials);
};

export const register = async (user: IUser) => {
  return await baseApi().post("/users/register", user);
};

export const signout = async () => {
  return await baseApi().post("users/sign-out");
};
