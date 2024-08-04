import { Schema, model, Types } from "mongoose";

const messageSchema = new Schema ({
    sender: {type: Types.ObjectId, ref: "User", required: true},
    receiver: {type: Types.ObjectId, ref: "User", required: true},
    message: {type: String, required: true}

},{
    timestamps: true
});

export const messageModel = model("Message", messageSchema);