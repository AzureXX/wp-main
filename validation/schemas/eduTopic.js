const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi.object({
  name: joi
    .object({
      us: joi
        .string()
        .required()
        .trim()
        .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/),
      ru: joi
        .string()
        .trim()
        .allow("")
        .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/),
      az: joi
        .string()
        .trim()
        .allow("")
        .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/)
    })
    .length(3)
    .unknown(false),
  description: joi
    .object({
      us: joi
        .string()
        .trim()
        .allow("")
        .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/),
      ru: joi
        .string()
        .trim()
        .allow("")
        .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/),
      az: joi
        .string()
        .trim()
        .allow("")
        .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/)
    })
    .length(3)
    .unknown(false),
  img: joi
    .object({
      us: joi
        .string()
        .trim()
        .allow("")
        .pattern(/^(?:[^\<\>\ ]*)$/),
      ru: joi
        .string()
        .trim()
        .allow("")
        .pattern(/^(?:[^\<\>\ ]*)$/),
      az: joi
        .string()
        .trim()
        .allow("")
        .pattern(/^(?:[^\<\>\ ]*)$/)
    })
    .length(3)
    .unknown(false),
  tags: joi.object().allow({}),
  subtopics: joi
    .array()
    .items(joi.string())
    .allow(null)
    .custom((value, helpers) => {
      let length = value.length;

      for (let i = 0; i < length; i++) {
        if (!mongooseID.isValid(value[i])) {
          return helpers.error("mongooseID.invalid");
        }
      }
      return value;
    }, "MongooseID_validity_checker"),
  icon: joi
    .string()
    .trim()
    .allow("")
    .pattern(/^(?:[^\<\>\ ]*)$/),
  courses: joi
    .array()
    .items(joi.string())
    .allow(null)
    .custom((value, helpers) => {
      let length = value.length;

      for (let i = 0; i < length; i++) {
        if (!mongooseID.isValid(value[i])) {
          return helpers.error("mongooseID.invalid");
        }
      }
      return value;
    }, "MongooseID_validity_checker")
});
