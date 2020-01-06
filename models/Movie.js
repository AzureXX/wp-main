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
  img: {
    us: String,
    ru: String,
    az: String
  },
  tags: {},
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person"
    }
  ],
  crew: [
    {
      role: String,
      person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Person"
      }
    }
  ],
  duration: String,
  genres: [String],
  released: Date,
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
  tmdbId: {
    type: Number,
    unique: true,
    sparse: true
  }
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
