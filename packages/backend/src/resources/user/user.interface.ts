import { Document, ObjectId } from "mongoose";

interface User extends Document {
  email: string;
  name: string;
  password: string;
  virtualAccountId: ObjectId;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export default User;
