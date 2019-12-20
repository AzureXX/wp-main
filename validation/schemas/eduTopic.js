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
          .required()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .required()
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
          .required()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        ru: joi
          .string()
          .required()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/),
        az: joi
          .string()
          .required()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<>]*)$/)
      })
      .required()
      .unknown(false),
    img: joi
      .object({
        us: joi
          .string()
          .required()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/),
        ru: joi
          .string()
          .required()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/),
        az: joi
          .string()
          .required()
          .trim()
          .allow("", null)
          .pattern(/^(?:[^<> ]*)$/)
      })
      .required()
      .unknown(false),
    tags: joi
      .object()
      .required()
      .allow({})
      .custom((value, helpers) => {
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
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
    subtopics: joi
      .string()
      .required()
      .allow("", null)
      .custom((value, helpers) => {
        let subTopicIDs = value.split(",");
        let length = subTopicIDs.length;

        for (let i = 0; i < length; i++) {
          if (!mongooseID.isValid(subTopicIDs[i].trim())) {
            return helpers.error("any.custom");
          }
        }
        return value;
      }, "MongooseID_validity_checker"),
    icon: joi
      .string()
      .required()
      .trim()
      .allow("", null)
      .pattern(/^(?:[^<> ]*)$/),
    courses: joi
      .string()
      .required()
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
  .required()
  .unknown(true);
