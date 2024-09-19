const { celebrate, Joi, errors, Segments } = require("celebrate");
const DELETE_COURSES_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.number().integer().not().empty().required(),
  }),
});
module.exports = {
  DELETE_COURSES_VALIDATOR,
};
