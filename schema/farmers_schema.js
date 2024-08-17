import Joi from "joi";

export const farmerSchema = Joi.object({

    name: Joi.string().required(),
    email: Joi.string().email().required(),
    profilePhoto: Joi.string(),
    farmName: Joi.string().required(),
    farmDescription: Joi.string(), 
    farmLocation: Joi.string(),
    farmImages: Joi.array().items(Joi.string()),
    user: Joi.string().required()

}) .with("password", "confirmPassword");