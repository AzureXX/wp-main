const schema = require("../schemas/music");

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "name": {
            switch (e.type) {
              case "string.empty":
                return "name.empty";
              case "string.pattern.base":
                return "name.invalidFormat";
              default:
                return "name.notPresent";
            }
          }
          case "singers": {
            switch (e.type) {
              case "any.custom":
                return "singers.invalidID";
              default:
                return "singers.notPresent";
            }
          }
          case "duration": {
            switch (e.type) {
              case "string.pattern.base":
                return "duration.invalidFormat";
              default:
                return "duration.notPresent";
            }
          }
          case "released": {
            switch (e.type) {
              case "date.format":
                return "released.invalidFormat";
              default:
                return "released.notPresent";
            }
          }
          case "genres": {
            switch (e.type) {
              case "any.custom":
                return "genre.invalidFormat";
              default:
                return "genres.notPresent";
            }
          }
          case "img": {
            switch (e.type) {
              case "string.pattern.base":
                return "img.invalidFormat";
              default:
                return "img.notPresent";
            }
          }
          case "video": {
            switch (e.type) {
              case "string.pattern.base":
                return "video.invalidFormat";
              default:
                return "video.notPresent";
            }
          }
          case "audio": {
            switch (e.type) {
              case "string.pattern.base":
                return "audio.invalidFormat";
              default:
                return "audio.notPresent";
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
          default:
            return "musicBody.notPresent";
        }
      })
    );
  }
};
