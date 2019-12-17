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
                    return "textUS.invalidChars";
                  case "string.empty":
                    return "textUS.required";
                  case "any.required":
                  default:
                    return "textUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "textRU.invalidChars";
                  default:
                    return "textRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "textAZ.invalidChars";
                  default:
                    return "textAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "text.modified";
            }
          }
          case "to": {
            switch (e.type) {
              case "string.empty":
                return "receivers.empty";
              case "any.custom":
                return "receivers.invalidID";
              default:
                return "receivers.modified";
            }
          }
          case "all": {
            switch (e.type) {
              default:
                return "all.modified";
            }
          }
          default:
            return "messageBody.modified";
        }
      })
    );
  }
};
