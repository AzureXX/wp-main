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
              case "any.only":
                return "education.invalidValue";
              default:
                return "education.notPresent";
            }
          }
          case "position": {
            switch (e.type) {
              case "string.empty":
                return "position.empty";
              case "string.pattern.base":
                return "position.invalidFormat";
              default:
                return "position.notPresent";
            }
          }
          case "email": {
            switch (e.type) {
              case "string.email":
                return "email.invalidFormat";
              default:
                return "email.notPresent";
            }
          }
          case "phone": {
            switch (e.type) {
              case "string.pattern.base":
                return "phone.invalidFormat";
              default:
                return "phone.notPresent";
            }
          }
          case "ageMin": {
            switch (e.type) {
              case "number.min":
                return "ageMin.minLimit";
              default:
                return "ageMin.notPresent";
            }
          }
          case "ageMax": {
            switch (e.type) {
              case "number.min":
                return "ageMax.refLimit";
              default:
                return "ageMax.notPresent";
            }
          }
          case "requirements": {
            switch (e.type) {
              case "string.pattern.base":
                return "requirements.invalidFormat";
              default:
                return "requirements.notPresent";
            }
          }
          case "workInfo": {
            switch (e.type) {
              case "string.pattern.base":
                return "workInfo.invalidFormat";
              default:
                return "workInfo.notPresent";
            }
          }
          case "companyName": {
            switch (e.type) {
              case "string.pattern.base":
                return "companyName.invalidFormat";
              default:
                return "companyName.notPresent";
            }
          }
          case "contactPerson": {
            switch (e.type) {
              case "string.pattern.base":
                return "contactPerson.invalidFormat";
              default:
                return "contactPerson.notPresent";
            }
          }
          case "subcategories": {
            switch (e.path[2]) {
              case "data":
                switch (e.type) {
                  case "any.required":
                    return "subcategories.data.empty";
                  case "any.custom":
                    return "subcategories.data.invalidID";
                  default:
                    return "subcategories.data.notPresent";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "subcategories.status.invalidValue";
                  default:
                    return "subcategories.status.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "subcategories.notPresent";
            }
          }
          case "topics": {
            switch (e.path[2]) {
              case "data":
                switch (e.type) {
                  case "any.required":
                    return "topics.data.empty";
                  case "any.custom":
                    return "topics.data.invalidID";
                  default:
                    return "topics.data.notPresent";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "topics.status.invalidValue";
                  default:
                    return "topics.status.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "topics.notPresent";
            }
          }
          case "subtopics": {
            switch (e.path[2]) {
              case "data":
                switch (e.type) {
                  case "any.required":
                    return "subtopics.data.empty";
                  case "any.custom":
                    return "subtopics.data.invalidID";
                  default:
                    return "subtopics.data.notPresent";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "subtopics.status.invalidValue";
                  default:
                    return "subtopics.status.notPresent";
                }
              }
            }
            switch (e.type) {
              default:
                return "subtopics.notPresent";
            }
          }
          case "experience":
            switch (e.type) {
              case "any.only":
                return "experience.invalidValue";
              default:
                return "experience.notPresent";
            }
          case "salary":
            switch (e.type) {
              case "any.only":
                return "salary.invalidValue";
              default:
                return "salary.notPresent";
            }
          case "city": {
            switch (e.type) {
              case "string.pattern.base":
                return "city.invalidFormat";
              default:
                return "city.notPresent";
            }
          }
          case "category": {
            switch (e.type) {
              case "any.only":
                return "category.invalidValue";
              default:
                return "category.notPresent";
            }
          }
          default:
            return "vacancyBody.notPresent";
        }
      })
    );
  }
};
