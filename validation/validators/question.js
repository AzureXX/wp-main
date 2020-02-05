const schema = require("../schemas/question");

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "multiple": {
            switch (e.type) {
              case "any.only":
                return "multiple.invalidValue";
              default:
                return "multiple.notPresent";
            }
          }
          case "text": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.empty":
                    return "textUS.empty";
                  case "string.pattern.base":
                    return "textUS.invalidFormat";
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
          case "answers": {
            switch (e.path[2]) {
              case "text": {
                switch (e.path[3]) {
                  case "us": {
                    switch (e.type) {
                      case "string.empty":
                        return "answer.textUS.empty";
                      case "string.pattern.base":
                        return "answer.textUS.invalidFormat";
                      default:
                        return "answer.textUS.notPresent";
                    }
                  }
                  case "ru": {
                    switch (e.type) {
                      case "string.pattern.base":
                        return "answer.textRU.invalidFormat";
                    }
                  }
                  case "az": {
                    switch (e.type) {
                      case "string.pattern.base":
                        return "answer.textAZ.invalidFormat";
                    }
                  }
                }
                switch (e.type) {
                  default:
                    return "answer.text.notPresent";
                }
              }
              case "result": {
                switch (e.path[4]) {
                  case "tagName": {
                    switch (e.type) {
                      case "string.pattern.base":
                        return "answer.tagName.invalidFormat";
                      case "string.min":
                        return "answer.tagName.minLength";
                      case "string.empty":
                        return "answer.tagName.empty";
                      default:
                        return "answer.tagName.notPresent";
                    }
                  }
                  case "effect": {
                    switch (e.type) {
                      default:
                        return "answer.effect.notPresent";
                    }
                  }
                }
                switch (e.type) {
                  default:
                    return "answer.result.notPresent";
                }
              }
            }
            switch (e.type) {
              case "array.min":
                return "answer.empty";
              default:
                return "answer.notPresent";
            }
          }
          case "tags": {
            switch (e.type) {
              case "any.custom":
                return "tags.invalidFormat";
              default:
                return "tags.notPresent";
            }
          }
          default:
            return "questionBody.notPresent";
        }
      })
    );
  }
};
