const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  mongooseId: (id) => {
    return ObjectId.isValid(id);
  }
};