import HttpException from "./http.exception";

class InvalidMealReservationStateException extends HttpException {
  constructor(message: string) {
    super(409, message);
  }
}

export default InvalidMealReservationStateException;
