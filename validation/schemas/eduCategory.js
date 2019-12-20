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
                .min(2)
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
    subcategories: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let subCategoryIDs = value.split(",");
        let length = subCategoryIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(subCategoryIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
    icon: joi
      .string()
      .trim()
      .allow("", null)
      .pattern(/^(?:[^<> ]*)$/),
    courses: joi
      .string()
      .allow("", null)
      .custom((value, helpers) => {
        let courseIDs = value.split(",");
        let length = courseIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(courseIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker")
  })
  .unknown(true);
