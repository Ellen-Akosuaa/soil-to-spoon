import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const farmerSchema = new Schema({
 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  profilePhoto: {type: String},
  farmName: { type: String, required: true },
  farmLocation: { type: String },
  farmDescription: { type: String },
  farmImages: { type: String }, 
  user:{type: Types.ObjectId, ref: 'User', required: true, unique: true},
  
});

farmerSchema.plugin(toJSON);

export const farmerModel = model("Farmer", farmerSchema);
