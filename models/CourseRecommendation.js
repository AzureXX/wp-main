const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseRecommendationSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courses: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        points: Number
    }]
});

const CourseRecommendation = mongoose.model('CourseRecommendation', CourseRecommendationSchema);
module.exports = CourseRecommendation;