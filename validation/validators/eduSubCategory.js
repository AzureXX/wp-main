const schema = require("../schemas/eduSubCategory");

module.exports = body => {
  let validationResult = schema.validate(body, {
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
                  case "string.pattern.base":
                    return "nameUS.invalidChars";
                  default:
                    return "nameUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "nameRU.invalidChars";
                  default:
                    return "nameRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "nameAZ.invalidChars";
                  default:
                    return "nameAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "name.modified";
            }
          }
          case "description": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionUS.invalidChars";
                  default:
                    return "descriptionUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionRU.invalidChars";
                  default:
                    return "descriptionRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionAZ.invalidChars";
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
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgUS.invalidChars";
                  default:
                    return "imgUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgRU.invalidChars";
                  default:
                    return "imgRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgAZ.invalidChars";
                  default:
                    return "imgAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "img.modified";
            }
          }
          case "tags": {
            switch (e.type) {
              case "key.length":
                return "tags.nameLength";
              case "any.custom":
                return "tags.invalidChars";
              default:
                return "tags.modified";
            }
          }
          case "topics": {
            switch (e.type) {
              case "any.custom":
                return "topics.invalidID";
              default:
                return "topics.modified";
            }
          }
          case "icon": {
            switch (e.type) {
              case "string.pattern.base":
                return "icon.invalidChars";
              default:
                return "icon.modified";
            }
          }
          case "courses": {
            switch (e.type) {
              case "any.custom":
                return "courses.invalidID";
              default:
                return "courses.modified";
            }
          }
          default:
            return "educationSubCategoryBody.modified";
        }
      })
    );
  }
};
