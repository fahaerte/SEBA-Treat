import axios from "axios";
import { ConfigService } from "../utils/ConfigService";

export const baseApi = axios.create({
  baseURL: `${new ConfigService().get("API_URL")}`,
});
