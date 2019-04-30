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
    ISBN: String,
    published: Date,
    publisher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
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
    img: {
        us: String,
        ru: String,
        az: String
    },
    tags: [String]
})

const Book = mongoose.model("Book", BookSchema)
module.exports = Book;