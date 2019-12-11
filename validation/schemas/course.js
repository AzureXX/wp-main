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
    // uncomment if it was added in request body
    // authors: joi
    //   .string()
    //   .allow("",null)
    //   .custom((value, helpers) => {
    //     let authorIDs = value.split(",");
    //     let length = authorIDs.length;

    //     for (let i = 0; i < length; i++) {
    //       if (!mongooseID.isValid(authorIDs[i].trim())) {
    //         return helpers.error("any.custom");
    //       }
    //     }
    //     return value;
    //   }, "MongooseID_validity_checker"),
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
    video: joi
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
      .unknown(false),
    link: joi
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
