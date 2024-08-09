import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const productSchema = new Schema({
    productName: { type: String, required: true },
    productDescription: { type: String }, 
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    productCategory: { type: String, enum: ["Vegetables", "Fruits", "Grains", "Poultry", "Meat", "Roots and Tubers"], required: true},
    farmer: { type: Types.ObjectId, ref: "User", required: true }

  },{
    timestamps: true
  });
  
  productSchema.plugin(toJSON);
  
  export const productModel = model("Product", productSchema);