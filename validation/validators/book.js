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
          case "isbn": {
            switch (e.type) {
              case "string.alphanum":
                return "isbn.invalidChars";
              default:
                return "isbn.modified";
            }
          }
          case "published": {
            switch (e.type) {
              case "date.base":
                return "published.required";
              case "date.less":
                return "published.timeLimit";
              default:
                return "published.modified";
            }
          }
          case "publisher": {
            switch (e.type) {
              case "any.custom":
                return "publisher.invalidID";
              default:
                return "publisher.modified";
            }
          }
          case "wikipediaLink": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkUS.invalidChars";
                  default:
                    return "wikipediaLinkUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkRU.invalidChars";
                  default:
                    return "wikipediaLinkRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkAZ.invalidChars";
                  default:
                    return "wikipediaLinkAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "wikipedia.modified";
            }
          }
          case "website": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteUS.invalidChars";
                  default:
                    return "websiteUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteRU.invalidChars";
                  default:
                    return "websiteRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteAZ.invalidChars";
                  default:
                    return "websiteAZ.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "website.modified";
            }
          }
          default:
            return "bookData.modified";
        }
      })
    );
  } else {
    return validationResult.value;
  }
};
