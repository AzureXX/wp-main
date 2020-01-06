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
  img: {
    us: String,
    ru: String,
    az: String
  },
  authors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person"
    }
  ],
  ISBN: String,
  published: Date,
  wikipediaLink: {
    us: String,
    ru: String,
    az: String
  },
  website: {
    us: String,
    ru: String,
    az: String
  },
  genres: [String],
  tags: {}
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
