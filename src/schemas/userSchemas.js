const Joi = require("joi");

const userSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    idade: Joi.number().integer().min(0).required(),
    email: Joi.string().email().required(),
});

module.exports = { userSchema };