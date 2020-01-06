const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi
  .object({
    text: joi
      .object({
        us: joi
          .string()
          .required()
          .trim()
          .pattern(/^(?:[^<>]*)$/),
        ru: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .allow("", null)
          .trim()
          .pattern(/^(?:[^<>]*)$/)
      })
      .required()
      .unknown(false),
    to: joi.when("all", {
      is: joi.valid(true),
      then: joi.string().allow("", null),
      otherwise: joi
        .string()
        .required()
        .custom((value, helpers) => {
          let receieverIDs = value.split(",");
          let length = receieverIDs.length;

          for (let i = 0; i < length; i++) {
            if (!mongooseID.isValid(receieverIDs[i])) {
              return helpers.error("any.custom");
            }
          }
          return value;
        })
    }),
    all: joi.valid(true, false).required()
  })
  .required()
  .unknown(true);
