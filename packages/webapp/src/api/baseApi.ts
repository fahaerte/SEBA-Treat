import axios from "axios";
import { ConfigService } from "../utils/ConfigService";
import { getCookie } from "../utils/auth/CookieProvider";

export const baseApi = () =>
  axios.create({
    baseURL: `${new ConfigService().get("API_URL")}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const baseApiAuth = () => {
  const token = getCookie('token');
  return axios.create({
    baseURL: `${new ConfigService().get("API_URL")}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const baseImageApi = () => {
  const token = getCookie('token');
  return axios.create({
    baseURL: `${new ConfigService().get("API_URL")}`,
    headers: {
      "Content-Type": "image/png",
      Authorization: `Bearer ${token}`,
    },
  });
};