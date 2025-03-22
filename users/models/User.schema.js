import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        middle: {
            type: String,
            default: ""
        },
        last: {
            type: String,
            required: true
        }
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            required: false,
            default: ""
        },
        alt: {
            type: String,
            required: false,
            default: ""
        },
    },
    address: {
        state: {
            type: String,
            required: false,
            default: ""
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        houseNumber: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        }
    },
    isBusiness: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

export default model("user", userSchema);