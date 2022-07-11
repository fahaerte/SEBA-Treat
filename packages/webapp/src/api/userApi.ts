import { baseApi, baseImageApi } from "./baseApi";

export const getUser = async (userId: string) => {
  console.log("execute getUser");
  const response = await baseApi.get(`/${userId}`);
  return response.data;
};

export const getProfilePictureURL = async (userId: string) => {
  const response = await baseImageApi.get(`/profile-picture/${userId}`);
  return URL.createObjectURL(response);
};
