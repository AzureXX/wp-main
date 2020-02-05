const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForgottenPasswordCodeSchema = new Schema({
  userId: {
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

const ForgottenPasswordCode = mongoose.model('ForgottenPasswordCode', ForgottenPasswordCodeSchema);
module.exports = ForgottenPasswordCode;
