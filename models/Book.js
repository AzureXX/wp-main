const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  
  name: {
    us: String,
    ru: String,
    az: String
  },
  description: {
    us: String,
    ru: String,
    az: String
  },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  genres: [String],
  ISBN: Number,
  published: Date,
  publisher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  wikipediaLink: {
    us: String
  },
  website: {
    us: String
  },  
  tags: [{name:String, level: Number}]
})

const Book = mongoose.model("Book", BookSchema)
module.exports = Book;