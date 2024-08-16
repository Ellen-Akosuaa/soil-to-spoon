import Joi from "joi";

export const cartItemSchema = Joi.object({
    product: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), // ObjectId is a 24-character hex string
    quantity: Joi.number().integer().min(1).default(1)
});

export const cartSchema = Joi.object({
    user: Joi.string().required(), 
    items: Joi.array().items(cartItemSchema).required(),
    total: Joi.number().min(0).default(0)
});

