const schema = require("../schemas/vacancy");

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });

  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "education": {
            switch (e.type) {
              default:
                return "education.modified";
            }
          }
          case "position": {
            switch (e.type) {
              case "string.empty":
                return "position.required";
              case "string.pattern.base":
                return "position.invalidChars";
              default:
                return "position.modified";
            }
          }
          case "email": {
            switch (e.type) {
              case "string.email":
                return "email.invalid";
              default:
                return "email.modified";
            }
          }
          case "phone": {
            switch (e.type) {
              case "string.pattern.base":
                return "phone.invalidChars";
              default:
                return "phone.modified";
            }
          }
          case "ageMin": {
            switch (e.type) {
              case "number.min":
                return "ageMin.Limit";
              default:
                return "ageMin.modified";
            }
          }
          case "ageMax": {
            switch (e.type) {
              case "number.min":
                return "ageMax.Limit";
              default:
                return "ageMax.modified";
            }
          }
          case "requirements": {
            switch (e.type) {
              case "string.pattern.base":
                return "requirements.invalidChars";
              default:
                return "requirements.modified";
            }
          }
          case "workInfo": {
            switch (e.type) {
              case "string.pattern.base":
                return "workInfo.invalidChars";
              default:
                return "workInfo.modified";
            }
          }
          case "companyName": {
            switch (e.type) {
              case "string.pattern.base":
                return "companyName.invalidChars";
              default:
                return "companyName.modified";
            }
          }
          case "contactPerson": {
            switch (e.type) {
              case "string.pattern.base":
                return "contactPerson.invalidChars";
              default:
                return "contactPerson.modified";
            }
          }
          case "subcategories": {
            switch (e.path[2]) {
              case "data":
                switch (e.type) {
                  case "any.required":
                    return "subcategories.data.required";
                  case "any.custom":
                    return "subcategories.data.invalidID";
                  default:
                    return "subcategories.data.modified";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "subcategories.status.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "subcategories.modified";
            }
          }
          case "topics": {
            switch (e.path[2]) {
              case "data":
                switch (e.type) {
                  case "any.required":
                    return "topics.data.required";
                  case "any.custom":
                    return "topics.data.invalidID";
                  default:
                    return "topics.data.modified";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "topics.status.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "topics.modified";
            }
          }
          case "subtopics": {
            switch (e.path[2]) {
              case "data":
                switch (e.type) {
                  case "any.required":
                    return "subtopics.data.required";
                  case "any.custom":
                    return "subtopics.data.invalidID";
                  default:
                    return "subtopics.data.modified";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "subtopics.status.modified";
                }
              }
            }
            switch (e.type) {
              default:
                return "subtopics.modified";
            }
          }
          case "experience":
            switch (e.type) {
              case "any.only":
                return "experience.modified";
            }
          case "salary":
            switch (e.type) {
              case "any.only":
                return "salary.modified";
            }
          case "city": {
            switch (e.type) {
              case "any.only":
                return "city.modified";
            }
          }
          case "city": {
            switch (e.type) {
              case "string.pattern.base":
                return "city.invalidChars";
              default:
                return "city.modified";
            }
          }
          case "category": {
            switch (e.type) {
              case "any.only":
                return "category.modified";
            }
          }
          default:
            return "vacancyBody.modified";
        }
      })
    );
  }
};
