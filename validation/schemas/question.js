const joi = require("@hapi/joi");

module.exports = joi
  .object({
    multiple: joi.custom((value, helpers) => {
      let allowed = [true, false];
      if (allowed.indexOf(value) == -1) {
        return helpers.error("any.custom");
      }
      return value;
    }),
    text: joi
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
      .required()
      .unknown(false),
    answers: joi
      .array()
      .items(
        joi.object({
          text: joi
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
            .required()
            .unknown(false),
          result: joi.array().items(
            joi
              .object({
                tagName: joi
                  .string()
                  .min(2)
                  .trim()
                  .pattern(/^[a-zA-Z][\w]*[a-zA-Z0-9]$/),
                effect: joi
                  .number()
                  .integer()
                  .required()
              })
              .unknown(false)
          )
        })
      )
      .required()
      .min(1),
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
      })
  })
  .unknown(true);
