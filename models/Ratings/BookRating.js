const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookRatingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  status: Number,
  rating: Number,
  date: {
    type: Date,
    default: new Date()
  }
});

const BookRating = mongoose.model('BookRating', BookRatingSchema);
module.exports = BookRating;
