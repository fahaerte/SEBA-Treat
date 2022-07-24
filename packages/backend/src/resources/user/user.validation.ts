import Joi from "joi";
import j2s from "joi-to-swagger";
import AddressValidation from "../address/address.validation";
import { IUser } from "@treat/lib-common";

const registerBody = Joi.object<
  Omit<IUser, "virtualAccount" | "stripeCustomerId">
>({
  email: Joi.string().email().required().example("test@user.de"),
  firstName: Joi.string().min(2).required().example("Max"),
  lastName: Joi.string().min(2).required().example("Mustermann"),
  profilePicture: Joi.string().required(),
  password: Joi.string().min(6).required().example("pa55word"),
  birthdate: Joi.date().required().example(new Date("2000-04-20")),
  address: AddressValidation.create.required(),
});

const loginBody = Joi.object({
  email: Joi.string().email().required().example("test@user.de"),
  password: Joi.string().required().example("pa55word"),
});

const getProfilePictureParams = Joi.object({
  userid: Joi.string().regex(/^[a-f\d]{24}$/i),
});

export default { registerBody, loginBody, getProfilePictureParams };

export const User = {
  RegisterUser: j2s(registerBody).swagger,
  LoginUser: j2s(loginBody).swagger,
};
