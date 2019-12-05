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
                return "name.required";
              case "string.pattern.base":
                return "name.invalidChars";
              default:
                return "name.modified";
            }
          }
          case "singers": {
            switch (e.type) {
              case "any.custom":
                return "singers.invalidID";
              default:
                return "singers.modified";
            }
          }
          case "duration": {
            switch (e.type) {
              case "string.pattern.base":
                return "duration.invalidChars";
              default:
                return "duration.modified";
            }
          }
          case "released": {
            switch (e.type) {
              case "date.base":
                return "released.required";
              case "date.less":
                return "released.timeLimit";
              default:
                return "released.modified";
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
          case "img": {
            switch (e.type) {
              case "string.pattern.base":
                return "img.invalidChars";
              default:
                return "img.modified";
            }
          }
          case "video": {
            switch (e.type) {
              case "string.pattern.base":
                return "video.invalidChars";
              default:
                return "video.modified";
            }
          }
          case "audio": {
            switch (e.type) {
              case "string.pattern.base":
                return "audio.invalidChars";
              default:
                return "audio.modified";
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
          default:
            return "musicData.modified";
        }
      })
    );
  } else {
    return validationResult.value;
  }
};
