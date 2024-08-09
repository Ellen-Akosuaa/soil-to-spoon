import Joi from "joi";

export const resourceSchema = Joi.object({

    title: Joi.string().required(),
    content: Joi.string().required(),
    dateAdded: Joi.date().required()
})