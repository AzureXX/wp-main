const schema = require("../schemas/book");

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
                    return "form.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "nameRU.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "nameAZ.invalidChars";
                  default:
                    return "form.modified";
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
                  case "string.pattern.base":
                    return "descriptionUS.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionRU.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "descriptionAZ.invalidChars";
                  default:
                    return "form.modified";
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
                  case "string.pattern.base":
                    return "imgUS.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgRU.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "imgAZ.invalidChars";
                  default:
                    return "form.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "form.modified";
            }
          }
          case "tags": {
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
          case "isbn": {
            switch (e.type) {
              case "string.alphanum":
                return "isbn.invalidChars";
              default:
                return "form.modified";
            }
          }
          case "published": {
            switch (e.type) {
              case "date.base":
                return "published.required";
              case "date.less":
                return "published.timeLimit";
            }
          }
          case "publisher": {
            switch (e.type) {
              case "string.base":
                return "form.modified";
              case "any.custom":
                return "publisher.invalidID";
            }
          }
          case "wikipediaLink": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkUS.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkRU.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkAZ.invalidChars";
                  default:
                    return "form.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "form.modified";
            }
          }
          case "website": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteUS.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteRU.invalidChars";
                  default:
                    return "form.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteAZ.invalidChars";
                  default:
                    return "form.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "form.modified";
            }
          }
          default:
            return "form.modified";
        }
      })
    );
  } else {
    return validationResult.value;
  }
};
