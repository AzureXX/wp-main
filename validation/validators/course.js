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
              case "any.custom":
                return "tags.invalidChars";
              default:
                return "tags.modified";
            }
          }
          case "authors": {
            switch (e.type) {
              case "any.custom":
                return "authors.invalidID";
              default:
                return "authors.modified";
            }
          }
          case "genres": {
            switch (e.type) {
              case "any.custom":
                return "genre.invalidChars";
              default:
                return "genres.modified";
            }
          }
          case "video": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoUS.invalidChars";
                  default:
                    return "videoUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoRU.invalidChars";
                  default:
                    return "videoRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "videoAZ.invalidChars";
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
                    return "linkUS.invalidChars";
                  default:
                    return "linkUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "linkRU.invalidChars";
                  default:
                    return "linkRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "linkAZ.invalidChars";
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
            return "courseData.modified";
        }
      })
    );
  } else {
    return validationResult.value;
  }
};
