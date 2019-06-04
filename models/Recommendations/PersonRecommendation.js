const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonRecommendationSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    people: [{
        _id:false,
        data: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        points: Number
    }]
});

const PersonRecommendation = mongoose.model('PersonRecommendation', PersonRecommendationSchema);
module.exports = PersonRecommendation;