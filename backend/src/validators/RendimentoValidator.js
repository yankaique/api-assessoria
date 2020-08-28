const {celebrate,Segments,Joi} = require('celebrate');

module.exports = celebrate({
    [Segments.BODY]:Joi.object().keys({
        dataInicial:Joi.date().min('now').iso().required(),
        proposta:Joi.number().integer().positive().required(),
        meses:Joi.number().positive().min(1).required()
    }),
    [Segments.HEADERS]: Joi.object().keys({
        id_assessor: Joi.string().required()
    }).unknown()
});