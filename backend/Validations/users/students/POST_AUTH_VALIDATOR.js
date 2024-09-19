const { celebrate, Joi, errors, Segments } = require("celebrate");
const POST_AUTH_VALIDATOR = celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    token: Joi.string().not().empty().required(),
  }),
});
module.exports = {
  POST_AUTH_VALIDATOR,
};
//todo sql injection validation
