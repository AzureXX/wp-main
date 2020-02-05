const mongoose = require('mongoose');
// mail sender
const sendForgottenPasswordMail = require('../mailSender/forgottenPassword');
// model
const ForgottenPasswordCode = require('../models/ForgottenPasswordCode');

module.exports = (userId, verifiedEmail) => {
  const passwordDocument = {
    userId: userId,
    email: verifiedEmail,
    code: new mongoose.mongo.ObjectId().toString()
  };
  ForgottenPasswordCode.create(passwordDocument);
  sendForgottenPasswordMail(passwordDocument);
};
