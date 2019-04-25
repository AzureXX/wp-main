const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
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
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
  crew: [
    {
      role: String,
      person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" }
    }
  ],
  genres: [String],
  wikipediaLink: {
    us: String,
    ru: String,
    az: String
  },
  tags: [String]
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
