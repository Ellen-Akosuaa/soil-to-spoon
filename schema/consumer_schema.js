import Joi from "joi";

export const consumerSchema = Joi.object({
    name: Joi.string().required(),
    profilePhoto: Joi.string(),   
    consumerPhone: Joi.string(),
    consumerEmail: Joi.string().email(),
    user: Joi.string().required()

}) .with("password", "confirmPassword");