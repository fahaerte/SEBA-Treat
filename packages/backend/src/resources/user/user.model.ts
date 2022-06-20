import {model, Schema, Types} from "mongoose";
import bcrypt from "bcrypt";
import User from "./user.interface";
import {AddressSchema} from "../address/address.model";

const UserSchema = new Schema<User>(
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
            required: true
        },
        address: {
            type: AddressSchema,
            required: true,
        },
        virtualAccountId: {
            type: Types.ObjectId,
            ref: "VirtualAccount",
            required: true,
        },
    },
    {timestamps: true}
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
