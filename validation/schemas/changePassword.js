const joi = require('@hapi/joi');
const mongooseID = require('mongoose').Types.ObjectId;

module.exports = joi.object({
  password1: joi
    .string()
    .min(5)
    .required(),
  password2: joi.required().equal(joi.ref('password1')),
  code: joi
    .custom((value, helpers) => {
      if (!mongooseID.isValid(value)) {
        return helpers.error('any.custom');
      }
    })
    .required()
});
