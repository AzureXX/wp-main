const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieRecommendationSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movies: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
        points: Number
    }]
});

const MovieRecommendation = mongoose.model('MovieRecommendation', MovieRecommendationSchema);
module.exports = MovieRecommendation;