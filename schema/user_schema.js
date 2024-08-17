import Joi from "joi";

export const userSchema = Joi.object({
    
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherNames: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.ref("password"),
    termsAndConditions: Joi.boolean().required(),
    userType: Joi.string().valid("Farmer", "Consumer")

}).with("password", "confirmPassword")