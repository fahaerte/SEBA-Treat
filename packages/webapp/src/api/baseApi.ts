import axios from "axios";
import { ConfigService } from "../utils/ConfigService";

export const baseApi = (token: string | undefined) =>
  axios.create({
    baseURL: `${new ConfigService().get("API_URL")}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || new ConfigService().get("BEARER")}`,
    },
  });

export const baseImageApi = (token: string | undefined) =>
  axios.create({
    baseURL: `${new ConfigService().get("API_URL")}`,
    headers: {
      "Content-Type": "image/png",
      Authorization: `Bearer ${token || new ConfigService().get("BEARER")}`,
    },
  });
