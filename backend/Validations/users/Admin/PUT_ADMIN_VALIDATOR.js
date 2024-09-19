const { celebrate, Joi, errors, Segments } = require("celebrate");
const {
  dateValidator,
  numberValidation,
  stringValidation,
  emailValidation,
  passwordValidator,
  phoneNumberValidator,
  genderValidator,
  nationalIdValidator,
} = require("../../CUSTOME_VALIDATIONS");
const PUT_ADMIN_VALIDATOR = celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    token: Joi.string().not().empty().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    admin_id: numberValidation,
    admin_email: emailValidation,
    oldPassword: stringValidation.custom(
      passwordValidator,
      "password validation"
    ),
    newPassword: Joi.optional(),
  }),
});
module.exports = {
  PUT_ADMIN_VALIDATOR,
};
//todo sql injection validation
