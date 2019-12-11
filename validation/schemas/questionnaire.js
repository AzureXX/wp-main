const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi.object({
  questions: joi
    .string()
    .required()
    .custom((value, helpers) => {
      let questionIDs = value.split(",");
      let length = questionIDs.length;

      for (let i = 0; i < length; i++) {
        if (!mongooseID.isValid(questionIDs[i])) {
          return helpers.error("any.custom");
        }
      }
      return value;
    }, "MongooseID_validity_checker"),
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
});
