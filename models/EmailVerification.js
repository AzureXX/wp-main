const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailVerificationSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  code: {
    type: String,
    required: true
  }
});

const EmailVerification = mongoose.model("ActivationCode", EmailVerificationSchema);
module.exports = EmailVerification;
