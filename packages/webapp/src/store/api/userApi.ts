import { emptyApi as api } from "../emptyApi";
import {
  UserControllerLogInArgs,
  UserControllerLogInResponse,
  UserControllerRegisterArgs,
  UserControllerRegisterResponse,
} from "./types/UserControllerDTO";

const injectedUserRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    userLogIn: build.query<
      UserControllerLogInResponse,
      UserControllerLogInArgs
    >({
      query: (queryArg) => ({
        url: `/api/users/login`,
        method: "POST",
        body: {
          email: queryArg.email,
          password: queryArg.password,
        },
      }),
    }),
    userRegistration: build.mutation<
      UserControllerRegisterResponse,
      UserControllerRegisterArgs
    >({
      query: (queryArg) => ({
        url: `/api/users/register`,
        method: "POST",
        body: queryArg,
      }),
    }),
  }),
});

export const { useUserLogInQuery, useUserRegistrationMutation } =
  injectedUserRtkApi;
