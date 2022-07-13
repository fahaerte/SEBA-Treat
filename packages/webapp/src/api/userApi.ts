import { baseApi, baseImageApi } from "./baseApi";

export const getUser = async (userId: string, token: string | undefined) => {
  const response = await baseApi(token).get(`/users/${userId}`);
  return response.data;
};

export const getUserPreview = async (userId: string) => {
  const response = await baseApi(undefined).get(`/users/preview/${userId}`);
  return response.data;
};

export const getProfilePictureURL = async (userId: string, token: string) => {
  const response = await baseImageApi(token).get(
    `users/profile-picture/${userId}`
  );
  return URL.createObjectURL(response);
};
