import Joi from "joi";

export const farmerSchema = Joi.object({

    name: Joi.string().required(),
    email: Joi.string().email().required(),
    farmName: Joi.string().required(),
    farmDescription: Joi.string(),
    farmLocation: Joi.string(),
    farmImage: Joi.string(),

}) .with("password", "confirmPassword");