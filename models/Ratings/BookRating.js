const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    books: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        status: String,
        rating: Number
    }]
});

const BookRating = mongoose.model('BookRating', BookRatingSchema);
module.exports = BookRating;