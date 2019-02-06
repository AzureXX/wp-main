const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handler: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "user"
  }
})

const User = mongoose.model("User", UserSchema)
module.exports = User;