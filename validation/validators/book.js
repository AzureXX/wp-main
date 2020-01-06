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
                return "genres.invalidFormat";
              default:
                return "genres.modified";
            }
          }
          case "isbn": {
            switch (e.type) {
              case "string.alphanum":
                return "isbn.invalidFormat";
              default:
                return "isbn.modified";
            }
          }
          case "published": {
            switch (e.type) {
              case "date.format":
                return "published.invalidFormat";
              default:
                return "published.modified";
            }
          }
          case "wikipediaLink": {
            switch (e.path[1]) {
              case "us": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkUS.invalidFormat";
                  default:
                    return "wikipediaLinkUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkRU.invalidFormat";
                  default:
                    return "wikipediaLinkRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "wikipediaLinkAZ.invalidFormat";
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
                    return "websiteUS.invalidFormat";
                  default:
                    return "websiteUS.modified";
                }
              }
              case "ru": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteRU.invalidFormat";
                  default:
                    return "websiteRU.modified";
                }
              }
              case "az": {
                switch (e.type) {
                  case "string.pattern.base":
                    return "websiteAZ.invalidFormat";
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
            return "bookBody.modified";
        }
      })
    );
  }
};
