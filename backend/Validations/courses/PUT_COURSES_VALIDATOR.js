const { celebrate, Joi, errors, Segments } = require("celebrate");
const {
  dateValidator,
  numberValidation,
  stringValidation,
  daysCourseValidation,
} = require("../CUSTOME_VALIDATIONS");
const PUT_COURSES_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    course_id: numberValidation.required(),
    hall_name: stringValidation,
    instructor: stringValidation,
    course_name: stringValidation,
    num_students: numberValidation.min(0),
    pass_mark: numberValidation,
    starting_time: numberValidation.min(8).max(19),
    ending_time: numberValidation.min(8).max(19),
    days: daysCourseValidation,
    max_students: numberValidation,
    availability: Joi.boolean().required(),
    price: numberValidation,
    duration_hours: numberValidation,
    registration_date: dateValidator,
    description: stringValidation,
    certificates: Joi.array().items(stringValidation).required().not().empty(),
  }),
});
module.exports = {
  PUT_COURSES_VALIDATOR,
};
//todo sql injection validation
