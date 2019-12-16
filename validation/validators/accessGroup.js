const schema = require("../schemas/accessGroup");

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
              case "string.pattern.base":
                return "groupName.invalidChars";
              case "string.empty":
                return "groupName.required";
              default:
                return "groupName.modified";
            }
          }
          case "users": {
            switch (e.type) {
              case "any.custom":
                return "users.invalidID";
              default:
                return "users.modified";
            }
          }
          case "showEmail":
          case "showPhone":
          case "showName":
          case "showDOB":
          case "showBookInfo":
          case "showMovieInfo":
          case "showMusicInfo":
          case "showCourseInfo":
          case "showEducationInfo":
          case "giveTasks": {
            switch (e.type) {
              case "any.only":
                return "accessOptions.invalid";
              default:
                return "accessOptions.modified";
            }
          }
          default:
            return "accessGroupBody.modified";
        }
      })
    );
  }
};
