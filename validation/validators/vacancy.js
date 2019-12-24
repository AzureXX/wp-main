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
                return "education.modified";
            }
          }
          case "position": {
            switch (e.type) {
              case "string.empty":
                return "position.empty";
              case "string.pattern.base":
                return "position.invalidFormat";
              default:
                return "position.modified";
            }
          }
          case "email": {
            switch (e.type) {
              case "string.email":
                return "email.invalidFormat";
              default:
                return "email.modified";
            }
          }
          case "phone": {
            switch (e.type) {
              case "string.pattern.base":
                return "phone.invalidFormat";
              default:
                return "phone.modified";
            }
          }
          case "ageMin": {
            switch (e.type) {
              case "number.min":
                return "ageMin.minLimit";
              default:
                return "ageMin.modified";
            }
          }
          case "ageMax": {
            switch (e.type) {
              case "number.min":
                return "ageMax.refLimit";
              default:
                return "ageMax.modified";
            }
          }
          case "requirements": {
            switch (e.type) {
              case "string.pattern.base":
                return "requirements.invalidFormat";
              default:
                return "requirements.modified";
            }
          }
          case "workInfo": {
            switch (e.type) {
              case "string.pattern.base":
                return "workInfo.invalidFormat";
              default:
                return "workInfo.modified";
            }
          }
          case "companyName": {
            switch (e.type) {
              case "string.pattern.base":
                return "companyName.invalidFormat";
              default:
                return "companyName.modified";
            }
          }
          case "contactPerson": {
            switch (e.type) {
              case "string.pattern.base":
                return "contactPerson.invalidFormat";
              default:
                return "contactPerson.modified";
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
                    return "subcategories.data.modified";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "subcategories.status.invalidValue";
                  default:
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
                    return "topics.data.empty";
                  case "any.custom":
                    return "topics.data.invalidID";
                  default:
                    return "topics.data.modified";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "topics.status.invalidValue";
                  default:
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
                    return "subtopics.data.empty";
                  case "any.custom":
                    return "subtopics.data.invalidID";
                  default:
                    return "subtopics.data.modified";
                }
              case "status": {
                switch (e.type) {
                  case "any.only":
                    return "subtopics.status.invalidValue";
                  default:
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
                return "experience.invalidValue";
              default:
                return "experience.modified";
            }
          case "salary":
            switch (e.type) {
              case "any.only":
                return "salary.invalidValue";
              default:
                return "salary.modified";
            }
          case "city": {
            switch (e.type) {
              case "string.pattern.base":
                return "city.invalidFormat";
              default:
                return "city.modified";
            }
          }
          case "category": {
            switch (e.type) {
              case "any.only":
                return "category.invalidValue";
              default:
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
