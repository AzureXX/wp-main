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
              case "any.custom":
              default:
                return "multiple.modified";
            }
          }
          case "text": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.empty":
                    return "textUS.required";
                  case "string.pattern.base":
                    return "textUS.invalidChars";
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
          case "answers": {
            switch (e.path[2]) {
              case "text": {
                switch (e.path[3]) {
                  case "us": {
                    switch (e.type) {
                      case "string.empty":
                        return "answer.textUS.required";
                      case "string.pattern.base":
                        return "answer.textUS.invalidChars";
                      default:
                        return "answer.textUS.modified";
                    }
                  }
                  case "ru": {
                    switch (e.type) {
                      case "string.pattern.base":
                        return "answer.textRU.invalidChars";
                    }
                  }
                  case "az": {
                    switch (e.type) {
                      case "string.pattern.base":
                        return "answer.textAZ.invalidChars";
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
                        return "answer.tagName.invalidChars";
                      case "string.min":
                        return "answer.tagName.nameLength";
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
                return "answer.required";
              default:
                return "answer.modified";
            }
          }
          case "tags": {
            switch (e.type) {
              case "key.length":
                return "tags.namelength";
              case "any.custom":
                return "tags.invalidChars";
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
