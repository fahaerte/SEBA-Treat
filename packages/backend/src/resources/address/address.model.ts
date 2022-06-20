import {Schema} from "mongoose";
import Address from "./address.interface";

export const AddressSchema = new Schema<Address>(
    {
        street: {
            type: String,
            required: true
        },
        houseNumber: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true,
            maxlength: 5,
            minlength: 5,
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }
)