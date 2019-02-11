const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
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
  genres: [String]
})

const Movie = mongoose.model("Movie", MovieSchema)
module.exports = Movie;