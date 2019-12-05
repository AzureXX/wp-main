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
    actors: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let actorIDs = value.split(",");
        let length = actorIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(actorIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
    // crew and duration might change based of request body
    // crew: joi
    //   .array()
    //   .items(
    //     joi
    //       .object({
    //         role: joi.string().allow("",null),
    //         person: joi
    //           .string()
    //           .allow("",null)
    //           .custom((value, helpers) => {
    //             if (!mongooseID.isValid(value.trim())) {
    //               return helpers.error("any.custom");
    //             }
    //             return value;
    //           }, "MongooseID_validity_checker")
    //       })
    //       .and("role","person")
    //       .unknown(false)
    //   )
    //   .allow("",null),
    //   add .pattern(valid duration regex) below
    //   duration: joi.string().allow(""),
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
    released: joi
      .date()
      .less("now")
      .required(),
    // just uncomment wikipediaLink if it gets added in the future
    // wikipediaLink: joi
    //   .object({
    //     us: joi
    //       .string()
    //       .allow("",null)
    //       .trim()
    //       .pattern(/^(?:[^\<\>\ ]*)$/),
    //     ru: joi
    //       .string()
    //       .allow("",null)
    //       .trim()
    //       .pattern(/^(?:[^\<\>\ ]*)$/),
    //     az: joi
    //       .string()
    //       .allow("",null)
    //       .trim()
    //       .pattern(/^(?:[^\<\>\ ]*)$/)
    //   })
    //   .unknown(false),
    website: joi
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
