const schema = require("../schemas/eduSubCategory");

module.exports = bodyObj => {
  let validationResult = schema.validate(bodyObj, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "name": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.empty":
                    return "nameUS.required";
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "nameUS.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "nameRU.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "nameAZ.invalidChars";
                  default:
                    return "form.modified";
                }
              }
            }
            switch (e.type) {
              case "object.length":
                return "form.modified";
              case "object.unknown":
                return "form.modified";
              default:
                return "form.modified";
            }
          }
          case "description": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "descriptionUS.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "descriptionRU.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "descriptionAZ.invalidChars";
                  default:
                    return "form.modified";
                }
              }
            }
            switch (e.type) {
              case "object.length":
                return "form.modified";
              case "object.unknown":
                return "form.modified";
              default:
                return "form.modified";
            }
          }
          case "img": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "imgUS.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "imgRU.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.base":
                    return "form.modified";
                  case "string.pattern.base":
                    return "imgAZ.invalidChars";
                  default:
                    return "form.modified";
                }
              }
            }
            switch (e.type) {
              case "object.length":
                return "form.modified";
              case "object.unknown":
                return "form.modified";
              default:
                return "form.modified";
            }
          }
          case "tags": {
            switch (e.type) {
              case "object.base":
                return "form.modified";
              default:
                return "form.modified";
            }
          }
          case "topics": {
            switch (e.type) {
              case "array.base":
                return "form.modified";
              case "mongooseID.invalid":
                return "topics.invalidID";
              default:
                return "form.modified";
            }
          }
          case "icon": {
            switch (e.type) {
              case "string.base":
                return "form.modified";
              case "string.pattern.base":
                return "icon.invalidChars";
              default:
                return "form.modified";
            }
          }
          case "courses": {
            switch (e.type) {
              case "array.base":
                return "form.modified";
              case "mongooseID.invalid":
                return "courses.invalidID";
              default:
                return "form.modified";
            }
          }
        }
      })
    );
  }
};
