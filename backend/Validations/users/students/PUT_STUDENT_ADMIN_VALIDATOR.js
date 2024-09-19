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
const PUT_STUDENT_ADMIN_VALIDATOR = celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    token: Joi.string().not().empty().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    student_id: numberValidation,
    national_id: numberValidation.custom(
      nationalIdValidator,
      "student_id validation"
    ),
    first_name: stringValidation,
    last_name: stringValidation,
    phone_number: stringValidation.custom(
      phoneNumberValidator,
      "phone number validation"
    ),
    city: stringValidation,
    country: stringValidation,
    street: stringValidation,
    email: emailValidation,
    gender: stringValidation.custom(genderValidator, "gender validation"),
    nationality: stringValidation,
    birth_date: stringValidation.custom(dateValidator, "date validation"),
    certificates: Joi.array()
      .items(stringValidation)
      .empty(Joi.array().length(0)),
  }),
});
module.exports = {
  PUT_STUDENT_ADMIN_VALIDATOR,
};
//todo sql injection validation
