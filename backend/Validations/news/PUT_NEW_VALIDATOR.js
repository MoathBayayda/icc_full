const { celebrate, Joi, errors, Segments } = require("celebrate");
const {
  stringValidation,
  dateValidator,
  numberValidation,
} = require("../CUSTOME_VALIDATIONS");
const PUT_NEW_VALIDATOR = celebrate({
  [Segments.BODY]: Joi.object().keys({
    news_id: numberValidation,
    title: stringValidation,
    description: stringValidation,
    content: stringValidation,
    news_date: dateValidator,
    src: Joi.array().items(stringValidation).min(1).not().empty().required(),
  }),
});
module.exports = {
  PUT_NEW_VALIDATOR,
};
//todo sql injection validation
