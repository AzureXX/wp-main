const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LimitSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  recommendations: {
    book: {
      type: Number,
      default: 3,
      min: 0
    },
    movie: {
      type: Number,
      default: 3,
      min: 0
    },
    music: {
      type: Number,
      default: 3,
      min: 0
    },
    course: {
      type: Number,
      default: 3,
      min: 0
    },
    career: {
      type: Number,
      default: 3,
      min: 0
    },
    education: {
      type: Number,
      default: 3,
      min: 0
    }
  }
});

const Limit = mongoose.model("Limit", LimitSchema);
module.exports = Limit;
