import { baseApi } from "./baseApi";
import { IUser, IUserCredentials } from "@treat/lib-common";
import axios from "axios";
import { ConfigService } from "../utils/ConfigService";

export const login = async (credentials: IUserCredentials) => {
  return await baseApi(undefined).post("/users/login", credentials);
};

export const register = async (user: IUser) => {
  return await baseApi(undefined).post("/users/register", user);
};
