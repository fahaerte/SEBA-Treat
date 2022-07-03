import { emptyApi as api } from "../emptyApi";
import {
  UserControllerLogInArgs,
  UserControllerLogInResponse,
  UserControllerRegisterArgs,
  UserControllerRegisterResponse,
} from "./types/UserControllerDTO";

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
          email: queryArg.email,
          username: queryArg.username,
          firstName: queryArg.firstName,
          lastName: queryArg.lastName,
          password: queryArg.password,
          birthdate: queryArg.birthdate,
          address: {
            street: queryArg.address.street,
            houseNumber: queryArg.address.houseNumber,
            postalCode: queryArg.address.postalCode,
            city: queryArg.address.city,
            country: queryArg.address.country,
          },
        },
      }),
    }),
  }),
});

export const { useUserLogInMutation, useUserRegistrationMutation } =
  injectedUserRtkApi;

export { injectedUserRtkApi as userApi };
