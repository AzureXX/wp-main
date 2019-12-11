const schema = require("../schemas/auth");

module.exports.signUp = reqBody => {
  let validationResult = schema.signUp.validate(reqBody, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "email": {
            switch (e.type) {
              case "string.email":
                return "email.notEmail";
              case "string.empty":
                return "email.required";
              default:
                return "email.modified";
            }
          }
          case "password": {
            switch (e.type) {
              case "string.empty":
                return "password.required";
              case "string.min":
                return "password.minLength";
              default:
                return "password.modified";
            }
          }
          case "password2": {
            switch (e.type) {
              case "any.only":
                return "password.notMatch";
            }
          }
          case "username": {
            switch (e.type) {
              case "string.min":
                return "username.min";
              case "string.max":
                return "username.max";
              case "string.pattern.base":
                return "username.invalidChars";
              default:
                return "username.modified";
            }
          }
          case "type": {
            switch (e.type) {
              case "string.empty":
                return "userType.required";
              case "any.only":
                return "userType.notAllowed";
              default:
                return "userType.modified";
            }
          }
          default:
            return "signUpBody.modified";
        }
      })
    );
  }
};

module.exports.signIn = reqBody => {
  let validationResult = schema.signIn.validate(reqBody, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case "email": {
            switch (e.type) {
              case "string.empty":
                return "email.required";
              case "string.email":
                return "email.notEmail";
              default:
                return "email.modified";
            }
          }
          case "password": {
            switch (e.type) {
              case "string.empty":
                return "password.required";
              default:
                return "password.modified";
            }
          }
          default:
            return "signInBody.modified";
        }
      })
    );
  }
};
