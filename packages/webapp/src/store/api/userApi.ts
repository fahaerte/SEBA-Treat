import { emptyApi as api } from "../emptyApi";
import { IUser, IUserCredentials } from "@treat/lib-common";

export type UserControllerLogInResponse = { token: string; user: IUser };
export type UserControllerLogInArgs = IUserCredentials;

export type UserControllerRegisterResponse = { token: string; user: IUser };
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
          // email: queryArg.email,
          // username: queryArg.username,
          // firstName: queryArg.firstName,
          // lastName: queryArg.lastName,
          // password: queryArg.password,
          // birthdate: queryArg.birthdate,
          // address: {
          //   street: queryArg.address.street,
          //   houseNumber: queryArg.address.houseNumber,
          //   postalCode: queryArg.address.postalCode,
          //   city: queryArg.address.city,
          //   country: queryArg.address.country,
          // },
          queryArg,
        },
      }),
    }),
  }),
});

export const { useUserLogInMutation, useUserRegistrationMutation } =
  injectedUserRtkApi;

export { injectedUserRtkApi as UserApi };
