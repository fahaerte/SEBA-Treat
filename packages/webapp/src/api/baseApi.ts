import axios from "axios";
import { ConfigService } from "../utils/ConfigService";

export const baseApi = axios.create({
  baseURL: `${new ConfigService().get("API_URL")}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${new ConfigService().get("BEARER")}`,
  },
});

export const baseImageApi = axios.create({
  baseURL: `${new ConfigService().get("API_URL")}`,
  headers: {
    "Content-Type": "image/png",
    Authorization: `Bearer ${new ConfigService().get("BEARER")}`,
  },
});
