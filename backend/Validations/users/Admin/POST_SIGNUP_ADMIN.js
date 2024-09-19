const { celebrate, Joi, errors, Segments } = require("celebrate");

const {
  stringValidation,
  emailValidation,
  passwordValidator,
} = require("../../CUSTOME_VALIDATIONS");

const POST_SIGNUP_ADMIN = celebrate({
  [Segments.BODY]: Joi.object().keys({
    admin_password: stringValidation.custom(
      passwordValidator,
      "password validation"
    ),
    admin_email: emailValidation,
  }),
});
module.exports = {
  POST_SIGNUP_ADMIN,
};
//todo sql injection validation
