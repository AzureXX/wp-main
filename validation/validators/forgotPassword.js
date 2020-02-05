const schema = require('../schemas/forgotPassword');

module.exports = body => {
  let validationResult = schema.validate(body, { abortEarly: false });
  if (validationResult.error) {
    throw new Error(
      validationResult.error.details.map(e => {
        switch (e.path[0]) {
          case 'email': {
            switch (e.type) {
              case 'string.empty':
                return 'email.required';
              case 'string.email':
                return 'email.invalidFormat';
              default:
                return 'email.notPresent';
            }
          }
          default:
            return 'forgotPWBody.notPresent';
        }
      })
    );
  }
};
