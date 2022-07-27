import { baseApi, baseApiAuth } from "./baseApi";
import { getCookie } from "../utils/auth/CookieProvider";
import { IUser } from "@treat/lib-common";

export const getUser = async () => {
  const userId = getCookie("userId");
  const response = await baseApiAuth().get(`/users/${userId}`);
  return response.data;
};

export const getUserPreview = async (userId: string) => {
  const response = await baseApi().get(`/users/${userId}/preview`);
  return response.data.data;
};

export const getTransactions = async () => {
  const response = await baseApiAuth().get(`/mealTransactions`);
  return response.data;
};

export const updateUser = async (user: Partial<IUser>) => {
  const response = await baseApiAuth().put("/users", user);
  return response.data;
};

export const updatePassword = async ({
  passwordOld,
  passwordNew,
  userId,
}: UpdatePasswordArgs) => {
  const response = await baseApiAuth().put("/users/password", {
    passwordOld,
    passwordNew,
    userId,
  });
  return response.data;
};

export type UpdatePasswordArgs = {
  passwordOld: string;
  passwordNew: string;
  userId: string;
};
