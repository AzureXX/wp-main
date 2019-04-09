const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  
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
  ISBN: Number,
  published: Date,
  publisher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  wikipediaLink: {
    en: String
  },
  website: {
    en: String
  },
  tags: [{name:String, level: Number}]
})

const Book = mongoose.model("Book", BookSchema)
module.exports = Book;