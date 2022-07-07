import HttpException from "./http.exception";

class AccountBalanceInsufficientException extends HttpException {
  constructor(userId: string) {
    super(403, `Account balance of user ${userId} is not sufficient.`);
  }
}

export default AccountBalanceInsufficientException;
