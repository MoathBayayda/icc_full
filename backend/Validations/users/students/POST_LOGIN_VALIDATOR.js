const { celebrate, Joi, errors, Segments } = require("celebrate");
const POST_LOGIN_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().not().empty().required(),
    password: Joi.string().not().empty().required(),
  }),
});
module.exports = {
  POST_LOGIN_VALIDATOR,
  //todo recaptcha
};
//todo sql injection validation
