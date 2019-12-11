const schema = require("../schemas/questionnaire");

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });

  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "questions": {
            switch (e.type) {
              case "string.empty":
                return "questions.required";
              case "any.custom":
                return "questions.invalidID";
              default:
                return "questions.modified";
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
            return "questionsBody.modified";
        }
      })
    );
  }
};
