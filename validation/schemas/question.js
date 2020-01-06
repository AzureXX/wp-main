const joi = require("@hapi/joi");

module.exports = joi
  .object({
    multiple: joi.required().valid(true, false),
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
      .required()
      .min(1)
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
          result: joi
            .array()
            .items(
              joi
                .object({
                  tagName: joi
                    .string()
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
      ),
    tags: joi
      .object()
      .allow({})
      .custom((value, helpers) => {
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
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
  .required()
  .unknown(true);
