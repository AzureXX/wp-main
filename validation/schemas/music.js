const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi
  .object({
    name: joi
      .string()
      .trim()
      .pattern(/^(?:[^<>]*)$/)
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
      .pattern(/^(?:[^<> ]*)$/),
    released: joi
      .date()
      .iso()
      .required(),
    genres: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let genres = value.split(",");
        let length = genres.length;
        
        for (let i = 0; i < length; i++) {
          if (!/^[a-zA-Z][a-zA-Z_]*[a-zA-Z]$/.test(genres[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "Genre_checker"),
    img: joi
      .string()
      .allow("", null)
      .pattern(/^(?:[^<> ]*)$/),
    video: joi
      .string()
      .allow("", null)
      .pattern(/^(?:[^<> ]*)$/),
    audio: joi
      .string()
      .allow("", null)
      .pattern(/^(?:[^<> ]*)$/),
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
                .pattern(/[a-zA-Z][\w]*[a-zA-Z0-9]$/)
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
