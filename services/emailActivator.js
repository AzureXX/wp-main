const mongoose = require("mongoose");
const ActivationCode = require("../models/ActivationCode");
const sendNoReplyMail = require("./noReplyMailSender");

module.exports = (userId, userEmail) => {
  const activationCodeObject = {
    userID: userId,
    email: userEmail,
    code: new mongoose.mongo.ObjectId().toString()
  };
  const userActivationCode = new ActivationCode(activationCodeObject);
  userActivationCode.save();
  return activationCodeObject.code;
  // sendNoReplyMail(userEmail);
};
