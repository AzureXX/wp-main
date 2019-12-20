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
                    return "nameUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "nameRU.invalidFormat";
                  default:
                    return "nameRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "nameAZ.invalidFormat";
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
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgUS.invalidFormat";
                  default:
                    return "imgUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgRU.invalidFormat";
                  default:
                    return "imgRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgAZ.invalidFormat";
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
              case "any.custom":
                return "tags.invalidFormat";
              default:
                return "tags.modified";
            }
          }
          // case "authors": {
          //   switch (e.type) {
          //     case "any.custom":
          //       return "authors.invalidID";
          //     default:
          //       return "authors.modified";
          //   }
          // }
          case "genres": {
            switch (e.type) {
              case "any.custom":
                return "genre.invalidFormat";
              default:
                return "genres.modified";
            }
          }
          case "video": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoUS.invalidFormat";
                  default:
                    return "videoUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoRU.invalidFormat";
                  default:
                    return "videoRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoAZ.invalidFormat";
                  default:
                    return "videoAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "video.modified";
            }
          }
          case "link": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "linkUS.invalidFormat";
                  default:
                    return "linkUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "linkRU.invalidFormat";
                  default:
                    return "linkRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "linkAZ.invalidFormat";
                  default:
                    return "linkAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "link.modified";
            }
          }
          default:
            return "courseBody.modified";
        }
      })
    );
  }
};
