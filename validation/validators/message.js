const schema = require("../schemas/message");

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "text": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "textUS.invalidFormat";
                  case "string.empty":
                    return "textUS.empty";
                  default:
                    return "textUS.notPresent";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "textRU.invalidFormat";
                  default:
                    return "textRU.notPresent";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "textAZ.invalidFormat";
                  default:
                    return "textAZ.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "text.notPresent";
            }
          }
          case "to": {
            switch (e.type) {
              case "string.empty":
                return "receivers.empty";
              case "any.custom":
                return "receivers.invalidID";
              default:
                return "receivers.notPresent";
            }
          }
          case "all": {
            switch (e.type) {
              case "any.only":
                return "all.invalidValue";
              default:
                return "all.notPresent";
            }
          }
          default:
            return "messageBody.notPresent";
        }
      })
    );
  }
};
