const { celebrate, Joi, errors, Segments } = require("celebrate");
const POST_NEW_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().not().empty().required(),
    description: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    date: Joi.string().not().empty().required(),
    urls: Joi.array().items(Joi.object().keys({
        src: Joi.string().not().empty().required(),
      })).min(1).not().empty().required(),
  }),
});
module.exports = {
  POST_NEW_VALIDATOR,
};
//todo sql injection validation
