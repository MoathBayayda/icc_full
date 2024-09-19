const { celebrate, Joi, errors, Segments } = require("celebrate");
const {
  numberValidation,
  stringValidation,
} = require("../../CUSTOME_VALIDATIONS");
const POST_STUDENT_CERTIFICATE_VALIDATOR = celebrate({
  [Segments.COOKIES]: Joi.object().keys({
    token: Joi.string().not().empty().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    certificate: stringValidation,
    student_id: numberValidation,
  }),
});
module.exports = {
  POST_STUDENT_CERTIFICATE_VALIDATOR,
};
