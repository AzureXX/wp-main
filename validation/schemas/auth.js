const joi = require("@hapi/joi");

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
      .email()
      .required(),
    password: joi
      .string()
      .min(5)
      .required(),
    password2: joi.ref("password"),
    username: joi
      .string()
      .trim()
      .allow("", null)
      .min(3)
      .max(20)
      .pattern(/^(?:[^\<\>\ ]*)$/),
    type: joi
      .string()
      .valid("private", "business")
      .required()
  })
  .required()
  .unknown(true);
