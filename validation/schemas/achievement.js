const joi = require("@hapi/joi");

module.exports = joi
  .object({
    order: joi
      .number()
      .required()
      .integer()
      .min(0),
    title: joi
      .object({
        us: joi
          .string()
          .required()
          .trim()
          .pattern(/^(?:[^<>]*)$/),
        ru: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<>]*)$/)
      })
      .unknown(false)
      .required(),
    description: joi
      .object({
        us: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<>]*)$/),
        ru: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<>]*)$/)
      })
      .unknown(false),
    img: joi
      .string()
      .trim()
      .allow("", null)
      .pattern(/^(?:[^<> ]*)$/)
  })
  .required()
  .unknown(true);
