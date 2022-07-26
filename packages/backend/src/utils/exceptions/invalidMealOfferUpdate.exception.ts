import HttpException from "./http.exception";

class InvalidMealOfferUpdateException extends HttpException {
  constructor(message: string) {
    super(409, message);
  }
}

export default InvalidMealOfferUpdateException;
