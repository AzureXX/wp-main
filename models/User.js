const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handler: {
    type: String,
    required: "Handler is required"
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  password: {
    type: String,
    required: "Password is required"
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