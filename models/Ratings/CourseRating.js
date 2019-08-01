const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courses: [{
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
        status: Number,
        rating: Number,
        date: {
            type: Date,
            default : new Date
        }
    }]
});

const CourseRating = mongoose.model('CourseRating', CourseRatingSchema);
module.exports = CourseRating;