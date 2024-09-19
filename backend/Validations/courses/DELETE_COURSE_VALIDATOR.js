const { celebrate, Joi, errors, Segments } = require("celebrate");
const {
  dateValidator,
  numberValidation,
  stringValidation,
} = require("../CUSTOME_VALIDATIONS");
const DELETE_COURSE_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    course_id: numberValidation,
    student_id: numberValidation,
  }),
});
module.exports = {
  DELETE_COURSE_VALIDATOR,
};
