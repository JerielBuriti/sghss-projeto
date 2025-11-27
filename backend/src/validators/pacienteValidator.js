const Joi = require('joi');
module.exports = Joi.object({
  nome: Joi.string().min(3).required(),
  cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  dataNascimento: Joi.date().required(),
  telefone: Joi.string().min(8).required(),
  endereco: Joi.string().min(5).required()
});
