/** 200 status code */
import { IUser } from "@treat/lib-common";
import { IUserCredentials } from "@treat/lib-common";

type TTokenResponse = { token: string };

export type UserControllerLogInResponse = TTokenResponse;
export type UserControllerLogInArgs = IUserCredentials;

export type UserControllerRegisterResponse = TTokenResponse;
export type UserControllerRegisterArgs = IUser;
