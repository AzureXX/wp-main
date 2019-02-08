const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  handler: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "user"
  }
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
