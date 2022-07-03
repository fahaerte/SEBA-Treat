import { IUser } from "./IUser";

export type IUserCredentials = Pick<IUser, "email" | "password">;
