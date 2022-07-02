import HttpException from "./http.exception";

class TransactionInWrongStateException extends HttpException {
  constructor(id: string) {
    super(404, `Transaction with id ${id} is in the wrong state.`);
  }
}

export default TransactionInWrongStateException;
