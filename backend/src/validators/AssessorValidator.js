const {celebrate,Segments,Joi} = require('celebrate');

module.exports= celebrate({
    [Segments.BODY]:Joi.object().keys({
        nome:Joi.string().min(2).max(200).required(),
        senha:Joi.string().min(6).max(50).required(),
        telefone:Joi.number().integer().min(12).positive().required(),
        email:Joi.string().max(200).email().required()
    }),
});