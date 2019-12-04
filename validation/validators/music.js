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
                return "form.modified";
            }
          }
          case "singers": {
            switch (e.type) {
              case "any.custom":
                return "singers.invalidID";
              case "string.base":
              default:
                return "form.modified";
            }
          }
          case "duration": {
            switch (e.type) {
              case "string.pattern.base":
                return "duration.invalidChars";
              default:
                return "form.modified";
            }
          }
          case "released": {
            switch (e.type) {
              case "date.base":
                return "released.required";
              case "date.less":
                return "released.timeLimit";
            }
          }
          case "genres": {
            switch (e.type) {
              case "any.custom":
                return "genre.invalidChars";
              case "string.base":
              default:
                return "form.modified";
            }
          }
          case "img": {
            switch (e.type) {
              case "string.base":
              default:
                return "form.modified";
              case "string.pattern.base":
                return "img.invalidChars";
            }
          }
          case "video": {
            switch (e.type) {
              case "string.base":
              default:
                return "form.modified";
              case "string.pattern.base":
                return "video.invalidChars";
            }
          }
          case "audio": {
            switch (e.type) {
              case "string.base":
              default:
                return "form.modified";
              case "string.pattern.base":
                return "audio.invalidChars";
            }
          }
          case "tags": {
            switch (e.type) {
              case "object.base":
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
