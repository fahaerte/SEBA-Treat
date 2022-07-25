import HttpException from "./http.exception";

class UserNotFoundException extends HttpException {
  constructor(userId: string) {
    super(404, `Could not find user with id ${userId}`);
  }
}

export default UserNotFoundException;
