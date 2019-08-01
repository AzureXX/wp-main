const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movies: [{
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
        status: Number,
        rating: Number,
        date: {
            type: Date,
            default : new Date
        }
    }]
});

const MovieRating = mongoose.model('MovieRating', MovieRatingSchema);
module.exports = MovieRating;