import Joi from "joi";
import j2s from "joi-to-swagger";

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default { register, login };

export const User = {
  RegisterUser: j2s(register).swagger,
  LoginUser: j2s(login).swagger,
};
