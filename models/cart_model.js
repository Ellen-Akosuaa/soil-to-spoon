import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const cartSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    total: { type: Number, default: 0 }
});


cartSchema.plugin(toJSON)

export const cartModel = model("Cart", cartSchema)