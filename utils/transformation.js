const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  mongooseId: (id) => {
    return new ObjectId(
      ObjectId.isValid(id) ? id : '000000000000000000000000'
    );
  }
};
