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
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
  crew: [
    {
      role: String,
      person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" }
    }
  ],
  genres: [String],
  wikipediaLink: {
    en: String
  }
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
