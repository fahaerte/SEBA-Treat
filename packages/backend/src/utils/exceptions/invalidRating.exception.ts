import HttpException from "./http.exception";

class InvalidRatingException extends HttpException {
  constructor(message: string) {
    super(409, message);
  }
}

export default InvalidRatingException;
