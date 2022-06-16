import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required()
})

export default {create};