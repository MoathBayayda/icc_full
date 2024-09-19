const { celebrate, Joi, errors, Segments } = require("celebrate");
const GET_REG_COURSES_VALIDATOR = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    student_id: Joi.number().integer().not().empty().required(),
  }),
});
module.exports = {
  GET_REG_COURSES_VALIDATOR,
};
