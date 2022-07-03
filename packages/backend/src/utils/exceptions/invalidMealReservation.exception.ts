import HttpException from "./http.exception";

class InvalidMealReservationException extends HttpException {
  constructor(message: string) {
    super(409, message);
  }
}

export default InvalidMealReservationException;
