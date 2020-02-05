const schema = require('../schemas/changePassword');

module.exports = body => {
  let validationResult = schema.validate(body, {
    abortEarly: false
  });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case 'password1': {
            switch (e.type) {
              case 'string.empty':
                return 'password1.empty';
              case 'string.min':
                return 'password1.minLength';
              default:
                return 'password1.notPresent';
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
          case 'code': {
            switch (e.type) {
              case 'any.custom':
                return 'code.invalid';
              default:
                return 'code.notPresent';
            }
          }
          default:
            return 'changePasswordBody.notPresent';
        }
      })
    );
  }
};
