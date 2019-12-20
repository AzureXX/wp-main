const joi = require("@hapi/joi");

module.exports = joi
  .object({
    name: joi
      .object({
        us: joi
          .string()
          .required()
          .trim()
          .pattern(/^(?:[^<>]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/)
      })
      .required()
      .unknown(false),
    description: joi
      .object({
        us: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/)
      })
      .unknown(false),
    img: joi
      .object({
        us: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/)
      })
      .unknown(false),
    tags: joi
      .object()
      .allow({})
      .custom((value, helpers) => {
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            if (key.length <= 1) {
              return helpers.error("key.length");
            }
            if (
              joi
                .string()
                .trim()
                .pattern(/^[a-zA-Z][\w]*[a-zA-Z0-9]$/)
                .validate(key).error ||
              joi
                .number()
                .integer()
                .required()
                .validate(value[key]).error
            ) {
              return helpers.error("any.custom");
            }
          }
        }
        return value;
      }),
    wikipediaLink: joi
      .object({
        us: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/),
        ru: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/),
        az: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/)
      })
      .unknown(false)
  })
  .unknown(true);
