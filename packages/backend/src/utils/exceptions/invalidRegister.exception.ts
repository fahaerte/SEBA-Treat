import HttpException from "./http.exception";

class InvalidRegisterException extends HttpException {
  constructor(message: string) {
    super(409, message);
  }
}

export default InvalidRegisterException;
