const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationTopicRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    topics: [{
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationTopics' },
        status: Number,
        rating: Number
    }]
});

const EducationTopicRating = mongoose.model('EducationTopicRating', EducationTopicRatingSchema);
module.exports = EducationTopicRating;