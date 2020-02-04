const joi = require('@hapi/joi');

module.exports.signIn = joi
  .object({
    email: joi
      .string()
      .email()
      .required(),
    password: joi.string().required()
  })
  .required()
  .unknown(true);

module.exports.signUp = joi
  .object({
    email: joi
      .string()
      .required()
      .email(),
    password: joi
      .string()
      .required()
      .min(5),
    password2: joi.ref('password'),
    username: joi
      .string()
      .trim()
      .allow(null)
      .min(3)
      .max(20)
      .pattern(/^(?:[^<>]*)$/),
    type: joi
      .string()
      .required()
      .valid('private', 'business'),
    policies: joi.required().valid(true)
  })
  .required()
  .unknown(true);
