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
              case "string.empty":
                return "user.empty";
              case "any.custom":
                return "user.invalidID";
              default:
                return "user.notPresent";
            }
          }
          case "type": {
            switch (e.type) {
              case "any.only":
                return "type.invalidValue";
              default:
                return "type.notPresent";
            }
          }
          case "deadline": {
            switch (e.type) {
              case "date.format":
                return "date.invalidFormat";
              default:
                return "date.notPresent";
            }
          }
          case "comment": {
            switch (e.type) {
              case "string.pattern.base":
                return "comment.invalidFormat";
              default:
                return "comment.notPresent";
            }
          }
          case "level": {
            switch (e.type) {
              case "any.only":
                return "level.invalidValue";
              default:
                return "level.notPresent";
            }
          }
          case "item": {
            switch (e.type) {
              case "any.custom":
                return "item.invalidID";
              default:
                return "item.notPresent";
            }
          }
          default:
            return "taskBody.notPresent";
        }
      })
    );
  }
};
