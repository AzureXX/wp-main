const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
    name: String,
    singers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Person" }],
    duration: String,
    released: Date,
    genres: [String],
    img: String,
    video: String,
    audio: String,
    discogs: String,
    tags: {}
});

const Music = mongoose.model("Music", MusicSchema);
module.exports = Music;