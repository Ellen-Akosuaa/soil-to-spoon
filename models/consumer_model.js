import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const consumerSchema = new Schema({
  
  name: { type: String, required: true },
  profilePhoto: {type: String},
  consumerPhone: { type: String },
  consumerEmail: { type: String, unique: true },
  user:{type: Types.ObjectId, ref: 'User', required: true}
  
});

consumerSchema.plugin(toJSON)

export const consumerModel = model("Consumer", consumerSchema);
