import fs from "fs";
import * as dotenv from "dotenv";
import { TConfigValues, TEnvConfig, TEnvConfigInput } from "./types";
import Joi from "joi";

export class ConfigServiceParser<T> {
  private readonly configValues: TConfigValues;
  private readonly envConfig: TEnvConfig;

  constructor(
    configValues: TConfigValues,
    filePath = ".env",
    input?: TEnvConfigInput
  ) {
    this.configValues = configValues;

    if (input) {
      this.envConfig = this.validateInput(input);
    } else {
      // check if there are node env vars available (e.g. set on azure app services) otherwise use local .env file
      const config = process.env.NODE_ENV?.length
        ? this.getProcessConfig()
        : dotenv.parse(fs.readFileSync(filePath));
      this.envConfig = this.validateInput(config);
    }
  }

  private getProcessConfig() {
    const result: TEnvConfigInput = {};
    Object.keys(this.configValues).forEach((item) => {
      result[item] = process.env[item];
    });
    return result;
  }

  private validateInput(envConfig: TEnvConfigInput): TEnvConfig {
    const schema: Joi.ObjectSchema = Joi.object(this.configValues);
    const result = schema.validate(envConfig);

    if (result.error) {
      throw new Error(`Config validation error: ${result.error.message}`);
    }

    return result.value as TEnvConfig;
  }

  get(key: keyof T): string {
    const result = String(this.envConfig[key as string]);
    if (!result) throw new Error(`key->${key as string} not found`);
    return result;
  }
}
