import Joi from "joi";
import j2s from "joi-to-swagger";

const register = Joi.object({
  name: Joi.string().required().example('testuser'),
  email: Joi.string().email().required().example('test@user.de'),
  password: Joi.string().min(6).required().example('pa55word'),
});

const login = Joi.object({
  email: Joi.string().email().required().example('teat@user.de'),
  password: Joi.string().required().example('pa55word'),
});

export default { register, login };

export const User = {
  RegisterUser: j2s(register).swagger,
  LoginUser: j2s(login).swagger,
};
