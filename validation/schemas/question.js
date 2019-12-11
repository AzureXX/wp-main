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
          .pattern(/^(?:[^\<\>]*)$/),
        ru: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^\<\>]*)$/),
        az: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^\<\>]*)$/)
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
                .pattern(/^(?:[^\<\>]*)$/),
              ru: joi
                .string()
                .allow("", null)
                .trim()
                .pattern(/^(?:[^\<\>]*)$/),
              az: joi
                .string()
                .allow("", null)
                .trim()
                .pattern(/^(?:[^\<\>]*)$/)
            })
            .required()
            .unknown(false),
          result: joi.array().items(
            joi
              .object({
                tagName: joi
                  .string()
                  .trim()
                  .pattern(/^(?:[^0123456789\<\>\/\\\|\ \{\}\[\]\+\*\`\~\@\#\$\%\^\&\=]*)$/),
                effect: joi.number().min(0)
              })
              .and("tagName", "effect")
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
            if (!/^(?:[^0123456789\<\>\/\\\|\ \{\}\[\]\+\*\`\~\@\#\$\%\^\&\=]*)$/.test(key.trim()) || !(+value[key] >= 0)) {
              return helpers.error("any.custom");
            }
          }
        }
        return value;
      })
  })
  .unknown(true);
