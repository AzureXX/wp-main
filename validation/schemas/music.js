const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi
  .object({
    name: joi
      .string()
      .required()
      .trim()
      .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/),
    singers: joi
      .string()
      .allow("")
      .custom((value, helpers) => {
        let singerIDs = value.split(",");
        let length = singerIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(singerIDs[i])) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
    duration: joi
      .string()
      .allow("")
      .pattern(/^(?:[^\<\>\ ]*)$/),
    released: joi.date().less("now"),
    genres: joi
      .string()
      .allow("")
      .custom((value, helpers) => {
        let genres = value.split(",");
        let length = genres.length;

        for (let i = 0; i < length; i++) {
          if (!/^(?:[^0123456789\<\>\ \.\!\?\`\'\"\~\#\$\%\^\&\*\(\)\+\=\/\|\:\;\@)]*)$/.test(genres[i])) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "Genre_checker"),
    img: joi
      .string()
      .allow("")
      .pattern(/^(?:[^\<\>\ ]*)$/),
    video: joi
      .string()
      .allow("")
      .pattern(/^(?:[^\<\>\ ]*)$/),
    audio: joi
      .string()
      .allow("")
      .pattern(/^(?:[^\<\>\ ]*)$/),
    tags: joi.object().allow({})
  })
  .and("name", "singers", "duration", "released", "genres", "img", "video", "audio", "tags")
  .unknown(true);
