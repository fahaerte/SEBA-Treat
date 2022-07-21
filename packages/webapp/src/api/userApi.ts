import { baseApi, baseApiAuth, baseImageApi } from "./baseApi";
import { getCookie } from "../utils/auth/CookieProvider";

export const getUser = async () => {
  const userId = getCookie('userId');
  const response = await baseApiAuth().get(`/users/${userId}`);
  return response.data;
};

export const getUserPreview = async () => {
  const userId = getCookie('userId');
  const response = await baseApi().get(`/users/${userId}/preview`);
  return response.data;
};

export const getProfilePictureURL = async () => {
  const userId = getCookie('userId');
  const response = await baseImageApi().get(
    `users/profile-picture/${userId}`
  );
  return URL.createObjectURL(response);
};
