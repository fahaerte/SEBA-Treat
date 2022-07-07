import Joi from "joi";
export { Joi };

export type TConfigValues = {
  [key: string]: Joi.Schema;
};

export type TEnvConfig = {
  [key: string]: string;
};

export type TEnvConfigInput = {
  [key: string]: string | undefined;
};
