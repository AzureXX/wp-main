const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseRatingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  status: Number,
  rating: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const CourseRating = mongoose.model('CourseRating', CourseRatingSchema);
module.exports = CourseRating;
