import Joi from "joi";

export const consumerSchema = Joi.object({

    name: Joi.string().required(),
    email: Joi.string().email().required(),
    businessName: Joi.string().required(),
    businessLocation: Joi.string(),
    businessPhone: Joi.string().required(),
    businessDescription: Joi.string(),

}) .with("password", "confirmPassword");