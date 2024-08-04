import { Schema, model } from "mongoose";

const consumerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  businessName: { type: String, required: true },
  businessLocation: {type: String},
  businessPhone: { type: String },
  businessDescription: { type: String },
});

export const consumerModel = model("Consumer", consumerSchema);
