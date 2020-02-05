const mongoose = require('mongoose');
const EmailVerification = require('../models/EmailVerification');
const sendEmailVerificationMail = require('../mailSender/emailVerification');

module.exports = (userId, userEmail) => {
  const verificationCodeObject = {
    userId: userId,
    email: userEmail,
    code: new mongoose.mongo.ObjectId().toString()
  };
  const emailActivationCode = new EmailVerification(verificationCodeObject);
  emailActivationCode.save();

  sendEmailVerificationMail(verificationCodeObject);
};
