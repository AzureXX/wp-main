const schema = require('../schemas/auth');

module.exports.signUp = reqBody => {
  let validationResult = schema.signUp.validate(reqBody, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case 'email': {
            switch (e.type) {
              case 'string.email':
                return 'email.invalidFormat';
              case 'string.empty':
                return 'email.empty';
              default:
                return 'email.notPresent';
            }
          }
          case 'password': {
            switch (e.type) {
              case 'string.empty':
                return 'password.empty';
              case 'string.min':
                return 'password.minLength';
              default:
                return 'password.notPresent';
            }
          }
          case 'password2': {
            switch (e.type) {
              case 'any.only':
                return 'password2.notMatch';
              default:
                return 'password2.notPresent';
            }
          }
          case 'username': {
            switch (e.type) {
              case 'string.min':
                return 'username.minLength';
              case 'string.max':
                return 'username.maxLength';
              case 'string.pattern.base':
                return 'username.invalidFormat';
              default:
                return 'username.notPresent';
            }
          }
          case 'type': {
            switch (e.type) {
              case 'any.only':
                return 'userType.invalidValue';
              default:
                return 'userType.notPresent';
            }
          }
          case 'policies': {
            switch (e.type) {
              case 'any.only':
                return 'policies.invalidValue';
              default:
                return 'policies.notPresent';
            }
          }
          default:
            return 'signUpBody.notPresent';
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
          case 'email': {
            switch (e.type) {
              case 'string.empty':
                return 'email.empty';
              case 'string.email':
                return 'email.invalidFormat';
              default:
                return 'email.notPresent';
            }
          }
          case 'password': {
            switch (e.type) {
              case 'string.empty':
                return 'password.empty';
              default:
                return 'password.notPresent';
            }
          }
          default:
            return 'signInBody.notPresent';
        }
      })
    );
  }
};
