const {celebrate,Segments,Joi} = require('celebrate');

module.exports = celebrate({
    [Segments.BODY]:Joi.object().keys({
        codigo: Joi.number().integer().positive().required(),
        valor: Joi.number().positive().required(),
        tipoPagamento: Joi.string().required(),
        id_fundos: Joi.number().integer().positive().required(),
        id_cliente: Joi.string().hex().required()
    }),
    [Segments.HEADERS]:Joi.object().keys({
         id_assessor: Joi.string().hex().required()
    }).unknown()
 })