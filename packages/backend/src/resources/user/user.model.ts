import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import UserDocument from "./user.interface";
import { AddressSchema } from "../address/address.model";
import { VirtualAccountSchema } from "../virtualAccount/virtualAccount.model";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    address: {
      type: AddressSchema,
      required: true,
    },
    virtualAccount: {
      type: VirtualAccountSchema,
      required: true,
    },
    stripeCustomerId: {
      type: String,
    },
    meanRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    countRatings: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

UserSchema.pre<UserDocument>("save", async function (next) {
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

export default model<UserDocument>("User", UserSchema);
