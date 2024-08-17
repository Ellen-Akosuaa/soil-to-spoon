import Joi from "joi";

export const productSchema = Joi.object({
    
productName: Joi.string().required(),
productDescription: Joi.string(), 
price: Joi.string().required(),
quantity: Joi.string().required(),
productCategory: Joi.string().valid("Vegetables", "Fruits", "Grains", "Poultry", "Meat", "Roots and Tubers").required(),
productImages: Joi.array().items(Joi.string()).required(),
farmer: Joi.string()
});


