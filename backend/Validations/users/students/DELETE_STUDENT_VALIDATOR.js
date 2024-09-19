const { celebrate, Joi, errors, Segments } = require("celebrate");
const { numberValidation } = require("../../CUSTOME_VALIDATIONS");
const DELETE_STUDENT_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    student_id: numberValidation,
  }),
});
module.exports = {
  DELETE_STUDENT_VALIDATOR,
};
