import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import User from "./user.interface";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    virtualAccountId: {
      type: Types.ObjectId,
      ref: "VirtualAccount",
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre<User>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<boolean | Error> {
  return await bcrypt.compare(password, this.password);
};

export default model<User>("User", UserSchema);
