const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookRecommendationSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    books: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        points: Number
    }]
});

const BookRecommendation = mongoose.model('BookRecommendation', BookRecommendationSchema);
module.exports = BookRecommendation;