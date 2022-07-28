import axios from "axios";
import { ConfigService } from "../utils/ConfigService";

const configService = new ConfigService();

export const baseApi = () => {
  axios.defaults.withCredentials = true;
  return axios.create({
    baseURL: `${configService.get("API_URL")}`,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const baseApiAuth = () => {
  return axios.create({
    baseURL: `${configService.get("API_URL")}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  });
};

export const baseImageApi = () => {
  return axios.create({
    baseURL: `${configService.get("API_URL")}`,
    headers: {
      "Content-Type": "image/png",
    },
  });
};
