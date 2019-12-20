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
          .pattern(/^(?:[^<>]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/)
      })
      .required()
      .unknown(false),
    description: joi
      .object({
        us: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/)
      })
      .unknown(false),
    img: joi
      .object({
        us: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/),
        ru: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/),
        az: joi
          .string()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/)
      })
      .unknown(false),
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
      }),
    authors: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let authorIDs = value.split(",");
        let length = authorIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(authorIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
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
    isbn: joi
      .string()
      .trim()
      .alphanum()
      .allow("", null),
    published: joi
      .date()
      .iso()
      .required(),
    publisher: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let publisherIDs = value.split(",");
        let length = publisherIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(publisherIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
    wikipediaLink: joi
      .object({
        us: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/),
        ru: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/),
        az: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/)
      })
      .unknown(false),
    website: joi
      .object({
        us: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/),
        ru: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/),
        az: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<> ]*)$/)
      })
      .unknown(false)
  })
  .unknown(true);
