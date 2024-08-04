import { Schema, model } from "mongoose";

const farmerSchema = new Schema({
  farmerName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  farmName: { type: String, required: true },
  farmLocation: { type: String },
  farmDescription: { type: String },
  farmImage: { type: String },
});

export const farmerModel = model("Farmer", farmerSchema);
