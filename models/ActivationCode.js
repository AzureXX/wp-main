const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivationSchema = new Schema({
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

const ActivationCode = mongoose.model("ActivationCode", ActivationSchema);
module.exports = ActivationCode;
