const schema = require("../schemas/task");

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "user": {
            switch (e.type) {
              case "any.custom":
                return "user.invalidID";
              case "any.required":
              default:
                return "user.modified";
            }
          }
          case "type": {
            switch (e.type) {
              case "any.only":
                return "type.only";
              default:
                return "type.modified";
            }
          }
          case "deadline": {
            switch (e.type) {
              case "date.format":
              default:
                return "date.modified";
            }
          }
          case "comment": {
            switch (e.type) {
              case "string.pattern.base":
                return "comment.invalidChars";
              default:
                return "comment.modified";
            }
          }
          case "level": {
            switch (e.type) {
              case "any.only":
                return "level.only";
              default:
                return "level.modified";
            }
          }
          case "item": {
            switch (e.type) {
              case "any.custom":
                return "item.invalidID";
              default:
                return "item.modified";
            }
          }
          default:
            return "taskBody.modified";
        }
      })
    );
  }
};
