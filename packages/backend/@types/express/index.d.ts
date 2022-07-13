import UserDocument from "../../src/resources/user/user.interface";

declare global {
  namespace Express {
    export interface Request {
      user: UserDocument;
    }
  }
}
