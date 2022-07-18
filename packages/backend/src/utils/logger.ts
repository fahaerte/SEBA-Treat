export interface ILogMessage {
  functionName: string;
  message?: string;
  details?: any;
}

const enum ELogLevel {
  Info = "info",
  Warn = "warn",
  Error = "error",
}

export default class Logger {
  public static info(message: ILogMessage): void {
    console.info(this.logMessage(ELogLevel.Info, message));
  }

  public static warn(message: ILogMessage): void {
    console.warn(this.logMessage(ELogLevel.Warn, message));
  }

  public static error(message: ILogMessage): void {
    console.error(this.logMessage(ELogLevel.Error, message));
  }

  private static logMessage(logLevel: ELogLevel, message: ILogMessage): string {
    if (message.details) {
      return `${logLevel}: FUNCTION: [${message.functionName}], MESSAGE: ${message.message}, DETAILS: ${message.details}`;
    }
    return `${logLevel}: FUNCTION: [${message.functionName}], MESSAGE: ${message.message}`;
  }
}
