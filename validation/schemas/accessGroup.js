const joi = require("@hapi/joi");
const mongooseID = require("mongoose").Types.ObjectId;
module.exports = joi
  .object({
    name: joi
      .string()
      .required()
      .trim()
      .pattern(/^(?:[^<>]*)$/),
    users: joi
      .array()
      .items(
        joi
          .string()
          .allow("")
          .custom((value, helpers) => {
            if (!mongooseID.isValid(value)) {
              return helpers.error("any.custom");
            }
            return value;
          })
      ),
    showEmail: joi.valid(true, false).required(),
    showPhone: joi.valid(true, false).required(),
    showName: joi.valid(true, false).required(),
    showDOB: joi.valid(true, false).required(),
    showBookInfo: joi.valid(true, false).required(),
    showMovieInfo: joi.valid(true, false).required(),
    showMusicInfo: joi.valid(true, false).required(),
    showCourseInfo: joi.valid(true, false).required(),
    showEducationInfo: joi.valid(true, false).required(),
    giveTasks: joi.valid(true, false).required()
  })
  .unknown(true);
