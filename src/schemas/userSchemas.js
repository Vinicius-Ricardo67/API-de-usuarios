const Joi = require("joi");

const userSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    sobrenome: Joi.string().min(3).required(),
    idade: Joi.number().integer().min(0).required(),
    profissao: Joi.string().required(),
    cidade: Joi.string().required(),
    estado: Joi.string().length(2).required(),
});

module.exports = { userSchema };