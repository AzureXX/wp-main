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
    //   .string()
    //   .required()
    //   .allow("", null)
    //   .custom((value, helpers) => {
    //     let crewIDs = value.split(",");
    //     let length = crewIDs.length;

    //     for (let i = 0; i < length; i++) {
    //       if (!mongooseID.isValid(crewIDs[i].trim())) {
    //         return helpers.error("any.custom");
    //       }
    //     }
    //     return value;
    //   }, "MongooseID_validity_checker"),
    // add .pattern(valid duration regex) below
    // duration: joi
    //   .string()
    //   .required()
    //   .allow("", null)
    //    .pattern(/^(?:[^<>]*)$/),
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
    released: joi
      .date()
      .iso()
      .required(),
    // just uncomment wikipediaLink if it gets added in the future
    // wikipediaLink: joi
    //   .object({
    //     us: joi
    //       .string()
    //       .allow("", null)
    //       .trim()
    //       .pattern(/^(?:[^<> ]*)$/),
    //     ru: joi
    //       .string()
    //       .allow("", null)
    //       .trim()
    //       .pattern(/^(?:[^<> ]*)$/),
    //     az: joi
    //       .string()
    //       .allow("", null)
    //       .trim()
    //       .pattern(/^(?:[^<> ]*)$/)
    //   })
    //   .unknown(false),
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
  .required()
  .unknown(true);
