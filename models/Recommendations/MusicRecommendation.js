const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicRecommendationSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    music: [{
        _id: false,
        data: { type: mongoose.Schema.Types.ObjectId, ref: 'Music' },
        points: Number
    }]
});

const MusicRecommendation = mongoose.model('MusicRecommendation', MusicRecommendationSchema);
module.exports = MusicRecommendation;