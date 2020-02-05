const schema = require("../schemas/movie");

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
          case "actors": {
            switch (e.type) {
              case "any.custom":
                return "actors.invalidID";
              default:
                return "actors.notPresent";
            }
          }
          // case "crew": {
          //   switch (e.type) {
          //     case "any.custom":
          //       return "crew.invalidID";
          //     default:
          //       return "crew.notPresent";
          //   }
          // }
          // case "duration": {
          //   switch (e.type) {
          //     case "string.pattern.base":
          //       return "duration.invalidFormat";
          //     default:
          //       return "duration.notPresent";
          //   }
          // }
          case "genres": {
            switch (e.type) {
              case "any.custom":
                return "genre.invalidFormat";
              default:
                return "genres.notPresent";
            }
          }
          case "released": {
            switch (e.type) {
              case "date.format":
                return "released.invalidFormat";
              default:
                return "relased.notPresent";
            }
          }
          // case "wikipediaLink": {
          //   switch (e.path[1]) {
          //     case "us": {
          //       switch (e.type) {
          //         case "string.pattern.base":
          //           return "wikipediaLinkUS.invalidFormat";
          //         default:
          //           return "wikipediaLinkUS.notPresent";
          //       }
          //     }
          //     case "ru": {
          //       switch (e.type) {
          //         case "string.pattern.base":
          //           return "wikipediaLinkRU.invalidFormat";
          //         default:
          //           return "wikipediaLinkRU.notPresent";
          //       }
          //     }
          //     case "az": {
          //       switch (e.type) {
          //         case "string.pattern.base":
          //           return "wikipediaLinkAZ.invalidFormat";
          //         default:
          //           return "wikipediaLinkAZ.notPresent";
          //       }
          //     }
          //   }
          //   switch (e.type) {
          //     default:
          //       return "wikipediaLink.notPresent";
          //   }
          // }
          case "website": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteUS.invalidFormat";
                  default:
                    return "websiteUS.notPresent";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteRU.invalidFormat";
                  default:
                    return "websiteRU.notPresent";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteAZ.invalidFormat";
                  default:
                    return "websiteAZ.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "website.notPresent";
            }
          }
          default:
            return "movieBody.notPresent";
        }
      })
    );
  }
};
