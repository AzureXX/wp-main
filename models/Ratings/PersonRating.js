const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonRatingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
  status: Number,
  rating: Number,
  date: {
    type: Date,
    default: new Date()
  }
});

const PersonRating = mongoose.model('PersonRating', PersonRatingSchema);
module.exports = PersonRating;
