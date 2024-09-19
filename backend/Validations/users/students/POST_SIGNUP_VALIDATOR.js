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

const POST_SIGNUP_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    national_id: numberValidation.custom(nationalIdValidator,"student_id validation"),
    first_name: stringValidation,
    last_name: stringValidation,
    phone_number: stringValidation.custom(phoneNumberValidator,"phone number validation"),
    city: stringValidation,
    country: stringValidation,
    street: stringValidation,
    email: emailValidation,
    registration_date: stringValidation.custom(dateValidator,"date validation"),
    gender: stringValidation.custom(genderValidator, "gender validation"),
    nationality: stringValidation,
    birth_date: stringValidation.custom(dateValidator, "date validation"),
    password: stringValidation.custom(passwordValidator, "password validation"),
  }),
});
module.exports = {
  POST_SIGNUP_VALIDATOR,
};
//todo sql injection validation
