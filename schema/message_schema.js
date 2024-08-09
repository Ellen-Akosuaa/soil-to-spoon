import Joi from "joi";

export const messageSchema = Joi.object({

    sender: Joi.string().required(),
    receiver: Joi.string().required(),
    message: Joi.string().required()
    
});