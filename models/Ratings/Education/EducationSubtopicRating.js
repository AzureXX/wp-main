const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSubtopicRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subtopics: [{
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubtopic' },
        status: Number,
        rating: Number
    }]
});

const EducationSubtopicRating = mongoose.model('EducationSubtopicRating', EducationSubtopicRatingSchema);
module.exports = EducationSubtopicRating;