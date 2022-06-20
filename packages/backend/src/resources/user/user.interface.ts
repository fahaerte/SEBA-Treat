import {Document, ObjectId} from "mongoose";
import Address from "../address/address.interface";

interface User extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    birthdate: Date;
    address: Address;
    virtualAccountId: ObjectId;

    isValidPassword(password: string): Promise<Error | boolean>;
}

export default User;
