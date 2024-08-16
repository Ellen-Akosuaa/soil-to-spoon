import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const businessSchema = new Schema({
  
  businessName: { type: String, required: true },
  profilePhoto: {type: String},
  businessLocation: {type: String},
  businessPhone: { type: String, required: true},
  businessEmail: { type: String, required: true, unique: true },
  businessDescription: { type: String },
  user:{type: Types.ObjectId, ref: 'User', required: true}
  
});

businessSchema.plugin(toJSON)

export const businessModel = model("Business", businessSchema);
