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
    // authors: joi
    //   .string()
    //   .allow("")
    //   .custom((value, helpers) => {
    //     let authorIDs = value.split(",");
    //     let length = authorIDs.length;

    //     for (let i = 0; i < length; i++) {
    //       if (!mongooseID.isValid(authorIDs[i])) {
    //         return helpers.error("any.custom");
    //       }
    //     }
    //     return value;
    //   }, "MongooseID_validity_checker"),
    genres: joi
      .string()
      .allow("")
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
      .unknown(false),
    link: joi
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
  // add 'authors' below if uncommented
  .and("name", "description", "img", "tags", "genres", "video", "link")
  .unknown(true);
