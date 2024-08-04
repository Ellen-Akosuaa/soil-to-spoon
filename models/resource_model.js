import { Schema, model } from "mongoose";

const resourceSchema = new Schema ({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    dateAdded: { type: Date, default: Date.now },
},{
    timestamps: true
});


export const resourceModel = model('Resource', resourceSchema );