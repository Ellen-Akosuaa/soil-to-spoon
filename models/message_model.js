import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const messageSchema = new Schema ({
    sender: {type: Types.ObjectId, ref: "User", required: true},
    receiver: {type: Types.ObjectId, ref: "User", required: true},
    message: {type: String, required: true}

},{
    timestamps: true
});

messageSchema.plugin(toJSON);

export const messageModel = model("Message", messageSchema);