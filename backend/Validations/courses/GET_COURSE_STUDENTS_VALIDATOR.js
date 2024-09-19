const { celebrate, Joi, errors, Segments } = require("celebrate");
const GET_COURSE_STUDENTS_VALIDATOR = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    course_id: Joi.number().integer().not().empty().required(),
  }),
});
module.exports = {
  GET_COURSE_STUDENTS_VALIDATOR,
};
