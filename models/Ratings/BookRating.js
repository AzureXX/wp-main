const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    books: [{
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        status: Number,
        rating: Number
    }]
});

const BookRating = mongoose.model('BookRating', BookRatingSchema);
module.exports = BookRating;