import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    categories: Joi.array().required(),
    allergens: Joi.array(),
    startDate: Joi.date().iso().required().min(Date.now()),
    endDate: Joi.date().iso().required().greater(Joi.ref("startDate")),
    portions: Joi.number().min(0).required(),
    pickUpDetails: Joi.string().required(),
    price: Joi.number().required()
});

export default {create};