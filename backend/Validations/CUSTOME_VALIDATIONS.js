const { Joi } = require("celebrate");

const dateValidator = (value, helpers) => {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  // Perform string check here
  if (!value.match(dateRegex)) {
    return helpers.message("Invalid date format");
  }
  return value;
};

const passwordValidator = (value, helpers) => {
  const passwordFirstCheck = /[0-9]{1,}/;
  const passwordSecondCheck = /[a-z]{1,}/;
  const passwordThirdCheck = /[A-Z]{1,}/;
  const passwordFourthCheck = /[~!@#$%^&*()_+\-=\\|{}\[\]?><;,.\"']+/;
  // Perform string check here
  if (
    !(
      value.match(passwordFirstCheck) &&
      value.match(passwordSecondCheck) &&
      value.match(passwordThirdCheck) &&
      value.match(passwordFourthCheck) &&
      value.length >= 8
    )
  ) {
    return helpers.message(
      "password is invalid it must includes at least 1 " +
        "numbers ,1 small letters , 1 capital letters and a special character"
    );
  }
  return value;
};

const phoneNumberValidator = (value, helpers) => {
  const phoneNumberRegex = /009627[7-9]{1,}[0-9]{7,}/;
  // Perform string check here
  if (!(value.match(phoneNumberRegex) && value.length === 14)) {
    //,the number should starts with 009627 "+
    //"then followed by 7 or 8 or 9 , followed by 7 digits
    return helpers.message(
      "Invalid phone number format , it should be a jordan mobile number which starts with 009627"
    );
  }
  return value;
};

const genderValidator = (value, helpers) => {
  // Perform string check here
  if (!(value === "male" || value === "female")) {
    return helpers.message(
      "Invalid gender , you have only 2 options , male of female"
    );
  }
  return value;
};

const nationalIdValidator = (value, helpers) => {
  // Perform string check here
  if (value.toString().length !== 14) {
    return helpers.message("Invalid national id");
  }
  return value;
};
const daysCourseValidation = (value, helpers) => {
  const daysRegex =
    /^(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday)(?:,(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday))*$/;
  // Perform string check here
  if (!value.match(daysRegex)) {
    //,the number should starts with 009627 "+
    //"then followed by 7 or 8 or 9 , followed by 7 digits
    return helpers.message(
      "Invalid days format , days must match the following :sunday,monday,tuesday,.... ,the format is :dayname,dayname," +
        "all days must be written correctly and Capitalization not allowed"
    );
  }
  return value;
};

const numberValidation = Joi.number().integer().not().empty().required();

const stringValidation = Joi.string().not().empty().required();

const emailValidation = Joi.string().not().empty().required().email();

module.exports = {
  dateValidator,
  numberValidation,
  stringValidation,
  emailValidation,
  passwordValidator,
  phoneNumberValidator,
  genderValidator,
  nationalIdValidator,
  daysCourseValidation
};
