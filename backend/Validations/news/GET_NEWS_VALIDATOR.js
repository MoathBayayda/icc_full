const { celebrate, Joi, errors, Segments } = require("celebrate");
const GET_NEWS_VALIDATOR = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    minId: Joi.number().integer().not().empty().required(),
    maxId: Joi.number().integer().not().empty().required(),
  }),
});
module.exports = {
  GET_NEWS_VALIDATOR,
};
