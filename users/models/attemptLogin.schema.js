import { Schema, model } from "mongoose";

const LoginAttempt = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    lastAttempt: {
        type: String,
        required: true
    },
    attempt: {
        type: Number,
        required: true
    }
});

export default model("blockUser", LoginAttempt);