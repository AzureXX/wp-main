const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movies: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
        status: String,
        rating: Number
    }]
});

const MovieRating = mongoose.model('MovieRating', MovieRatingSchema);
module.exports = MovieRating;