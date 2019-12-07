const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi
  .object({
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
          .allow("", null)
          .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/)
      })
      .required()
      .unknown(false),
    description: joi
      .object({
        us: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=]*)$/)
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
    subtopics: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let subTopicIDs = value.split(",");
        let length = subTopicIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(subTopicIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
    icon: joi
      .string()
      .trim()
      .allow("", null)
      .pattern(/^(?:[^\<\>\ ]*)$/),
    courses: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let courseIDs = value.split(",");
        let length = courseIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(courseIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker")
  })
  .unknown(true);
