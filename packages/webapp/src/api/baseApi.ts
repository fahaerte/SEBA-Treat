import axios from "axios";
import { ConfigService } from "../utils/ConfigService";

export const baseApi = () =>
  axios.create({
    baseURL: `${new ConfigService().get("API_URL")}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const baseApiAuth = (token: string | undefined) =>
  axios.create({
    baseURL: `${new ConfigService().get("API_URL")}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || undefined}`,
    },
  });

export const baseImageApi = (token: string | undefined) =>
  axios.create({
    baseURL: `${new ConfigService().get("API_URL")}`,
    headers: {
      "Content-Type": "image/png",
      Authorization: `Bearer ${token || undefined}`,
    },
  });
