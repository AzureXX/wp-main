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
                return "multiple.modified";
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
                    return "textUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "textRU.invalidFormat";
                  default:
                    return "textRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "textAZ.invalidFormat";
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
                        return "answer.textUS.modified";
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
                    return "answer.text.modified";
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
                        return "answer.tagName.modified";
                    }
                  }
                  case "effect": {
                    switch (e.type) {
                      default:
                        return "answer.effect.modified";
                    }
                  }
                }
                switch (e.type) {
                  default:
                    return "answer.result.modified";
                }
              }
            }
            switch (e.type) {
              case "array.min":
                return "answer.empty";
              default:
                return "answer.modified";
            }
          }
          case "tags": {
            switch (e.type) {
              case "any.custom":
                return "tags.invalidFormat";
              default:
                return "tags.modified";
            }
          }
          default:
            return "questionBody.modified";
        }
      })
    );
  }
};
