const Joi = require('joi');
module.exports = Joi.object({
  pacienteId: Joi.number().required(),
  profissionalId: Joi.number().required(),
  data: Joi.date().required(),
  horario: Joi.string().pattern(/^[0-9]{2}:[0-9]{2}$/).required(),
  motivo: Joi.string().allow('')
});
