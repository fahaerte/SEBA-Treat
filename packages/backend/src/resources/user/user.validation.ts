import Joi from "joi";
import j2s from "joi-to-swagger";
import AddressValidation from "../address/address.validation";
import { IUser } from "@treat/lib-common";

const register = Joi.object<Omit<IUser, "virtualAccount" | "stripeCustomerId">>(
  {
    email: Joi.string().email().required().example("test@user.de"),
    firstName: Joi.string().required().example("Max"),
    lastName: Joi.string().required().example("Mustermann"),
    password: Joi.string().min(6).required().example("pa55word"),
    birthdate: Joi.date().required().example(new Date("2000-04-20")),
    address: AddressValidation.create.required(),
  }
);

const login = Joi.object({
  email: Joi.string().email().required().example("test@user.de"),
  password: Joi.string().required().example("pa55word"),
});

export default { register, login };

export const User = {
  RegisterUser: j2s(register).swagger,
  LoginUser: j2s(login).swagger,
};
