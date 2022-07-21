import { baseApi, baseApiAuth, baseImageApi } from "./baseApi";

export const getUser = async (userId: string, token: string | undefined) => {
  const response = await baseApiAuth(token).get(`/users/${userId}`);
  return response.data;
};

export const getTransactions = async (token: string | undefined) => {
  const response = await baseApiAuth(token).get(`/mealTransactions`);
  return response.data;
};

export const getProfilePictureURL = async (userId: string, token: string) => {
  const response = await baseImageApi(token).get(
    `users/profile-picture/${userId}`
  );
  return URL.createObjectURL(response);
};
