const mongoose = require("mongoose");
const EmailVerification = require("../models/EmailVerification");
const sendNoReplyMail = require("./noReplyMailSender");

module.exports = (userId, userEmail) => {
  const verificationCodeObject = {
    userID: userId,
    email: userEmail,
    code: new mongoose.mongo.ObjectId().toString()
  };
  const emailActivationCode = new EmailVerification(verificationCodeObject);
  emailActivationCode.save();
  return verificationCodeObject.code;
  // sendNoReplyMail(userEmail, verificationCodeObject);
};
