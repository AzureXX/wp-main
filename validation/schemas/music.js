const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi
  .object({
    name: joi
      .string()
      .trim()
      .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/)
      .required(),
    singers: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let singerIDs = value.split(",");
        let length = singerIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(singerIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
    duration: joi
      .string()
      .allow("", null)
      .pattern(/^(?:[^\<\>\ ]*)$/),
    released: joi
      .date()
      .less("now")
      .required(),
    genres: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let genres = value.split(",");
        let length = genres.length;

        for (let i = 0; i < length; i++) {
          if (!/^(?:[^0123456789\<\>\ \.\!\?\`\'\"\~\#\$\%\^\&\*\(\)\+\=\/\|\:\;\@)]*)$/.test(genres[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "Genre_checker"),
    img: joi
      .string()
      .allow("", null)
      .pattern(/^(?:[^\<\>\ ]*)$/),
    video: joi
      .string()
      .allow("", null)
      .pattern(/^(?:[^\<\>\ ]*)$/),
    audio: joi
      .string()
      .allow("", null)
      .pattern(/^(?:[^\<\>\ ]*)$/),
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
