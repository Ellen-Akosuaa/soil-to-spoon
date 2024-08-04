import { Schema, model, Types } from "mongoose";

const productSchema = new Schema({
    productName: { type: String, required: true },
    productDescription: { type: String }, 
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    productCategory: { type: String, enum: ["Vegetables", "Fruits", "Grains", "Poultry", "Meat", "Roots and Tubers"], required: true},
    farmer: { type: Types.ObjectId, ref: "User", required: true }

  });
  
  export const productModel = model("Product", productSchema);