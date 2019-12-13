const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi
  .object({
    education: joi.valid("default", "orta", "ali"),
    position: joi
      .string()
      .required()
      .trim()
      .pattern(/^(?:[^\<\>]*)$/),
    email: joi
      .string()
      .email()
      .allow("", null),
    phone: joi
      .string()
      .trim()
      .allow("", null)
      .pattern(/^([\+0-9\(])([0-9\(\)\-\s]){0,18}([0-9\)])$/),
    ageMin: joi
      .number()
      .min(0)
      .allow(null),
    ageMax: joi.when("ageMin", {
      is: joi
        .number()
        .min(0)
        .required(),
      then: joi
        .number()
        .min(joi.ref("ageMin"))
        .allow(null),
      otherwise: joi
        .number()
        .min(0)
        .allow(null)
    }),
    requirements: joi
      .string()
      .trim()
      .allow("", null)
      .pattern(/^(?:[^\<\>]*)$/),
    workInfo: joi
      .string()
      .trim()
      .allow("", null)
      .pattern(/^(?:[^\<\>]*)$/),
    companyName: joi
      .string()
      .trim()
      .allow("", null)
      .pattern(/^(?:[^\<\>]*)$/),
    contactPerson: joi
      .string()
      .trim()
      .allow("", null)
      .pattern(/^(?:[^\<\>]*)$/),
    subcategories: joi
      .array()
      .allow(null)
      .items(
        joi.object({
          data: joi
            .object({
              _id: joi
                .string()
                .required()
                .custom((value, helpers) => {
                  if (!mongooseID.isValid(value.trim())) {
                    return helpers.error("any.custom");
                  }
                  return value;
                })
            })
            .unknown(true),
          status: joi.valid(1, 2, 3, 4, 5)
        })
      ),
    topics: joi
      .array()
      .allow(null)
      .items(
        joi.object({
          data: joi
            .object({
              _id: joi
                .string()
                .required()
                .custom((value, helpers) => {
                  if (!mongooseID.isValid(value.trim())) {
                    return helpers.error("any.custom");
                  }
                  return value;
                })
            })
            .unknown(true),
          status: joi.valid(1, 2, 3, 4, 5)
        })
      ),
    subtopics: joi
      .array()
      .allow(null)
      .items(
        joi.object({
          data: joi
            .object({
              _id: joi
                .string()
                .required()
                .custom((value, helpers) => {
                  if (!mongooseID.isValid(value.trim())) {
                    return helpers.error("any.custom");
                  }
                  return value;
                })
            })
            .unknown(true),
          status: joi.valid(1, 2, 3, 4, 5)
        })
      ),
    experience: joi.valid("default", "all", 1, 2, 3, 5, 10, "more"),
    salary: joi.valid("default", "all", 100, 200, 400, 600, 800, 1000),
    city: joi
      .string()
      .allow("", null)
      .pattern(/^(?:[^\<\>]*)$/),
    category: joi.valid("default", "all", "finance", "construction", "education", "design", "management", "service", "trade", "it")
  })
  .unknown(true);
