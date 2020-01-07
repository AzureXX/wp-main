const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LimitSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  recommendations: {
    book: 3,
    movie:3,
    music: 3,
    course: 3,
    career: 3,
    education: 3
  }
});

const Limit = mongoose.model("ActivationCode", LimitSchema);
module.exports = Limit;
