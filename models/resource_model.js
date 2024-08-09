import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const resourceSchema = new Schema ({
    title: { type: String, required: true },
    content: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
},{
    timestamps: true
});

resourceSchema.plugin(toJSON)
export const resourceModel = model('Resource', resourceSchema );