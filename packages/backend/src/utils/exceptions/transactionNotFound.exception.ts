import HttpException from "./http.exception";

class TransactionNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Transaction for mealOffer ${id} not found`);
  }
}

export default TransactionNotFoundException;
