const schema = require("../schemas/course");

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });
  console.log(body);
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        console.log(e);
        switch (e.path[0]) {
          case "name": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.empty":
                    return "nameUS.required";
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "nameUS.invalidChars";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "nameRU.invalidChars";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "nameAZ.invalidChars";
                }
              }
            }
            switch (e.type) {
              default:
                return "form.modified";
            }
          }
          case "description": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "descriptionUS.invalidChars";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "descriptionRU.invalidChars";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "descriptionAZ.invalidChars";
                }
              }
            }
            switch (e.type) {
              default:
                return "form.modified";
            }
          }
          case "img": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "imgUS.invalidChars";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "imgRU.invalidChars";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "imgAZ.invalidChars";
                }
              }
            }
            switch (e.type) {
              default:
                return "form.modified";
            }
          }
          case "tags": {
            console.log(e.type)
            switch (e.type) {
              case "object.base":
              default:
                return "form.modified";
            }
          }
          case "authors": {
            switch (e.type) {
              case "string.base":
              default:
                return "form.modified";
              case "any.custom":
                return "authors.invalidID";
            }
          }
          case "genres": {
            switch (e.type) {
              case "string.base":
              default:
                return "form.modified";
              case "any.custom":
                return "genre.invalidChars";
            }
          }
          case "video": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "videoUS.invalidChars";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "videoRU.invalidChars";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "videoAZ.invalidChars";
                }
              }
            }
            switch (e.type) {
              default:
                return "form.modified";
            }
          }
          case "link": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "linkUS.invalidChars";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "linkRU.invalidChars";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.base":
                  default:
                    return "form.modified";
                  case "string.pattern.base":
                    return "linkAZ.invalidChars";
                }
              }
            }
            switch (e.type) {
              default:
                return "form.modified";
            }
          }
        }
      })
    );
  } else {
    return validationResult.value;
  }
};
