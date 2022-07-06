import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ConfigService } from "../utils/ConfigService";

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${new ConfigService().get("API_URL")}/api`,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).user.user.jwt;
      // TODO Mit context ersetzen,
      // const userContext = useContext(UserContext); Geht nicht
      // const token = (getState() as RootState).user.user.jwt;

      // if (token) {
      //   headers.set("authorization", `Bearer ${token}`);
      // }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
