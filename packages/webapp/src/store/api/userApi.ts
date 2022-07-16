import { emptyApi as api } from "../emptyApi";
import { IAddress, IUser, IUserCredentials } from "@treat/lib-common";

export type UserControllerLogInResponse = {
  token: string;
  userId: string;
  address: IAddress;
};
export type UserControllerLogInArgs = IUserCredentials;

export type UserControllerRegisterResponse = {
  token: string;
  userId: string;
  address: IAddress;
};
export type UserControllerRegisterArgs = IUser;

const injectedUserRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    userLogIn: build.mutation<
      UserControllerLogInResponse,
      UserControllerLogInArgs
    >({
      query: (queryArg) => ({
        url: `/users/login`,
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
        url: `/users/register`,
        method: "POST",
        body: {
          queryArg,
        },
      }),
    }),
  }),
});

export const { useUserLogInMutation, useUserRegistrationMutation } =
  injectedUserRtkApi;

export { injectedUserRtkApi as UserApi };
