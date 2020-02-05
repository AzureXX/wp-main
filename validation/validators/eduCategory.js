const schema = require("../schemas/eduCategory");

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
                    return "nameUS.empty";
                  case "string.pattern.base":
                    return "nameUS.invalidFormat";
                  default:
                    return "nameUS.notPresent";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "nameRU.invalidFormat";
                  default:
                    return "nameRU.notPresent";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "nameAZ.invalidFormat";
                  default:
                    return "nameAZ.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "name.notPresent";
            }
          }
          case "description": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionUS.invalidFormat";
                  default:
                    return "descriptionUS.notPresent";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionRU.invalidFormat";
                  default:
                    return "descriptionRU.notPresent";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionAZ.invalidFormat";
                  default:
                    return "descriptionAZ.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "description.notPresent";
            }
          }
          case "img": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgUS.invalidFormat";
                  default:
                    return "imgUS.notPresent";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgRU.invalidFormat";
                  default:
                    return "imgRU.notPresent";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgAZ.invalidFormat";
                  default:
                    return "imgAZ.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "img.notPresent";
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
          case "subcategories": {
            switch (e.type) {
              case "any.custom":
                return "subCategories.invalidID";
              default:
                return "subCategories.notPresent";
            }
          }
          case "icon": {
            switch (e.type) {
              case "string.pattern.base":
                return "icon.invalidFormat";
              default:
                return "icon.notPresent";
            }
          }
          case "courses": {
            switch (e.type) {
              case "any.custom":
                return "courses.invalidID";
              default:
                return "courses.notPresent";
            }
          }
          default:
            return "educationCategoryBody.notPresent";
        }
      })
    );
  }
};
