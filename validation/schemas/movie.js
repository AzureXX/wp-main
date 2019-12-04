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
          .allow("")
          .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/),
        az: joi
          .string()
          .trim()
          .allow("")
          .pattern(/^(?:[^\<\>\/\\\|\{\}\[\]\+\*\`\~\@\#\$\%\^\&\_\=\;]*)$/)
      })
      .and("us", "ru", "az")
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
      .and("us", "ru", "az")
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
      .and("us", "ru", "az")
      .unknown(false),
    tags: joi.object().allow({}),
    actors: joi
      .string()
      .allow("")
      .custom((value, helpers) => {
        let actorIDs = value.split(",");
        let length = actorIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(actorIDs[i])) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
    // crew: joi
    //   .array()
    //   .items(
    //     joi
    //       .object({
    //         role: joi.string().allow(""),
    //         person: joi
    //           .string()
    //           .allow("")
    //           .custom((value, helpers) => {
    //             if (!mongooseID.isValid(value)) {
    //               return "any.custom";
    //             }
    //             return value;
    //           }, "MongooseID_validity_checker")
    //       })
    //       .and("role","person")
    //       .unknown(false)
    //   )
    //   .allow(null),
    //   duration: joi.string().allow(""),
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
    released: joi.date().less("now"),
    // duration: joi
    //   .string()
    //   .allow("")
    //   .pattern(/^(?:[^\<\>\ ]*)$/),
    // wikipediaLink: joi
    //   .object({
    //     us: joi
    //       .string()
    //       .allow("")
    //       .trim()
    //       .pattern(/^(?:[^\<\>\ ]*)$/),
    //     ru: joi
    //       .string()
    //       .allow("")
    //       .trim()
    //       .pattern(/^(?:[^\<\>\ ]*)$/),
    //     az: joi
    //       .string()
    //       .allow("")
    //       .trim()
    //       .pattern(/^(?:[^\<\>\ ]*)$/)
    //   })
    //   .and("us", "ru", "az")
    //   .unknown(false),
    website: joi
      .object({
        us: joi
          .string()
          .allow("")
          .trim()
          .pattern(/^(?:[^\<\>\ ]*)$/),
        ru: joi
          .string()
          .allow("")
          .trim()
          .pattern(/^(?:[^\<\>\ ]*)$/),
        az: joi
          .string()
          .allow("")
          .trim()
          .pattern(/^(?:[^\<\>\ ]*)$/)
      })
      .and("us", "ru", "az")
      .unknown(false)
  })
  // add key names below for commented keys above
  .and("name", "description", "img", "tags", "actors", "genres", "released", "website")
  .unknown(true);
