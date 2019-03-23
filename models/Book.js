const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  ISBN: Number,
  name: {
    en: String,
    ru: String,
    az: String
  },
  description: {
    en: String,
    ru: String,
    az: String
  },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  genres: [String],
  wikipediaLink: {
    en: String
  }
  
})

const Book = mongoose.model("Book", BookSchema)
module.exports = Book;