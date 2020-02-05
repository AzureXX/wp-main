const schema = require("../schemas/course");

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
          // case "authors": {
          //   switch (e.type) {
          //     case "any.custom":
          //       return "authors.invalidID";
          //     default:
          //       return "authors.notPresent";
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
          case "video": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoUS.invalidFormat";
                  default:
                    return "videoUS.notPresent";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoRU.invalidFormat";
                  default:
                    return "videoRU.notPresent";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoAZ.invalidFormat";
                  default:
                    return "videoAZ.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "video.notPresent";
            }
          }
          case "link": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "linkUS.invalidFormat";
                  default:
                    return "linkUS.notPresent";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "linkRU.invalidFormat";
                  default:
                    return "linkRU.notPresent";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "linkAZ.invalidFormat";
                  default:
                    return "linkAZ.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "link.notPresent";
            }
          }
          default:
            return "courseBody.notPresent";
        }
      })
    );
  }
};
