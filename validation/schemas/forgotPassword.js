const joi = require('@hapi/joi');

module.exports = joi
  .object({
    email: joi
      .string()
      .email()
      .required()
  })
  .unknown(true)
  .required();
