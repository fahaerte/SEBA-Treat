import { ConfigServiceParser } from "./ConfigServiceParser";
import { TConfigValues, TEnvConfigInput } from "./types";

interface IConfigService<T> {
  get(key: keyof T): string;
}

export abstract class ConfigServiceAbstract<T> implements IConfigService<T> {
  private static instance: ConfigServiceAbstract<any>;
  private readonly service: ConfigServiceParser<T> | null = null;

  protected constructor(
    configValues: TConfigValues,
    filePath?: string,
    input?: TEnvConfigInput
  ) {
    if (ConfigServiceAbstract.instance) {
      return ConfigServiceAbstract.instance;
    }

    this.service = new ConfigServiceParser<T>(configValues, filePath, input);

    ConfigServiceAbstract.instance = this;
  }

  get(key: keyof T) {
    if (!this.service) throw new Error("config service null");
    return this.service.get(key);
  }
}
