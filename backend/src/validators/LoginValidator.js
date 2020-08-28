const {celebrate,Segments,Joi} = require('celebrate');

module.exports= celebrate({
    [Segments.BODY]:Joi.object().keys({
        email:Joi.string().max(200).email().required(),
        senha:Joi.string().min(6).max(50).required()
    }),
});