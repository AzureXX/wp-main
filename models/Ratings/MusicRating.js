const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicRatingSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  music: { type: mongoose.Schema.Types.ObjectId, ref: 'Music' },
  status: Number,
  rating: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const MusicRating = mongoose.model('MusicRating', MusicRatingSchema);
module.exports = MusicRating;
