const {celebrate,Segments,Joi} = require('celebrate');

module.exports= celebrate({
    [Segments.BODY]:Joi.object().keys({
        nome:Joi.string().min(2).max(200).required(),
        cpf:Joi.number().precision(11).required(),
        email:Joi.string().max(200).email().required()
    }),
    [Segments.HEADERS]:Joi.object().keys({
        id_assessor: Joi.string().hex().required()
    }).unknown()
});