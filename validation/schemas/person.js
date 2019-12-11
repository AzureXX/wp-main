const joi = require("@hapi/joi");

module.exports = joi
  .object({
    name: joi
      .object({
        us: joi
          .string()
          .required()
          .trim()
          .pattern(/^(?:[^\<\>]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>]*)$/)
      })
      .required()
      .unknown(false),
    description: joi
      .object({
        us: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>]*)$/)
      })
      .unknown(false),
    img: joi
      .object({
        us: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>\ ]*)$/)
      })
      .unknown(false),
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
      }),
    wikipediaLink: joi
      .object({
        us: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^\<\>\ ]*)$/)
      })
      .unknown(false)
  })
  .unknown(true);
