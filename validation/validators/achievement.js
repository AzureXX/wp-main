const schema = require("../schemas/achievement");

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "order": {
            switch (e.type) {
              case "number.min":
                return "order.error";
              case "number.integer":
                return "number.notPrecise";
              default:
                return "order.modified";
            }
          }
          case "title": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {                    
                  case "string.empty":
                    return "titleUS.empty";
                  case "string.pattern.base":
                    return "titleUS.invalidFormat";
                  default:
                    return "titleUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "titleRU.invalidFormat";
                  default:
                    return "titleRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "titleAZ.invalidFormat";
                  default:
                    return "titleAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "title.modified";
            }
          }
          case "description": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionUS.invalidFormat";
                  default:
                    return "descriptionUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionRU.invalidFormat";
                  default:
                    return "descriptionRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionAZ.invalidFormat";
                  default:
                    return "descriptionAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "description.modified";
            }
          }
          case "img": {
            switch (e.type) {
              case "string.pattern.base":
                return "img.invalidFormat";
              default:
                return "img.modified";
            }
          }
        }
      })
    );
  }
};
