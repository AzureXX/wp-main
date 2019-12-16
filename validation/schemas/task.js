const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;

module.exports = joi
  .object({
    user: joi.required().custom((value, helpers) => {
      if (!mongooseID.isValid(value)) {
        return helpers.error("any.custom");
      }
      return value;
    }),
    type: joi.required().valid("Book", "Movie", "Music", "Course", "EducationTopic", "EducationSubtopic", "EducationSubcategory"),
    deadline: joi
      .date()
      .iso()
      .allow("", null),
    comment: joi
      .string()
      .allow("", null)
      .trim()
      .pattern(/^(?:[^\<\>]*)$/),
    level: joi.when("type", {
      is: joi.valid("EducationTopic", "EducationSubtopic", "EducationSubcategory"),
      then: joi.valid(null, "beginner", "intermediate", "advanced", "expert", "master"),
      otherwise: joi.valid("", null)
    }),
    item: joi.required().custom((value, helpers) => {
      if (!mongooseID.isValid(value)) {
        return helpers.error("any.custom");
      }
      return value;
    })
  })
  .unknown(true);
