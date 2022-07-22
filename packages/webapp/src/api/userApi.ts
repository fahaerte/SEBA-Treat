import { baseApiAuth, baseImageApi } from "./baseApi";
import { getCookie } from "../utils/auth/CookieProvider";

export const getUser = async () => {
  const userId = getCookie("userId");
  const response = await baseApiAuth().get(`/users/${userId}`);
  return response.data;
};

export const getTransactions = async () => {
  const response = await baseApiAuth().get(`/mealTransactions`);
  return response.data;
};

export const getProfilePictureURL = async () => {
  const userId = getCookie("userId");
  const response = await baseImageApi().get(`users/profile-picture/${userId}`);
  return URL.createObjectURL(response);
};
