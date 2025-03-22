import { Schema, model } from 'mongoose';

const cardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    web: {
        type: String,
        required: false
    },
    image: {
        url: {
            type: String,
            required: false,
            default: "https://freedesignfile.com/upload/2012/03/001c0674123.jpg"
        },
        alt: {
            type: String,
            required: false
        }
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
    bizNumber: {
        type: Number,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    likes: {
        type: [Schema.Types.ObjectId],
        ref: "user",
        required: false
    }
});

export default model('card', cardSchema);