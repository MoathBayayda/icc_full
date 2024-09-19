const { celebrate, Joi, errors, Segments } = require("celebrate");
const GET_NEW_VALIDATOR = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    id: Joi.number().integer().not().empty().required(),
  }),
});
module.exports = {
  GET_NEW_VALIDATOR,
};
