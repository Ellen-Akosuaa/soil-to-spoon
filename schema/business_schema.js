import Joi from "joi";

export const businessSchema = Joi.object({
    businessName: Joi.string().required(),
    businessLocation: Joi.string(),
    businessPhone: Joi.string().required(),
    businessEmail: Joi.string().email().required(),businessDescription: Joi.string(),
    user: Joi.string().required()

}) .with("password", "confirmPassword");