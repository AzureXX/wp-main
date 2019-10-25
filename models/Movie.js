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
    crew: [{
        role: String,
        person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" }
    }],
    duration: String,
    released: Date,
    genres: [String],
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
    tags: {}
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;