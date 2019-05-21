const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    people: [{
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        status: String,
        rating: Number,
        date: {
            type: Date,
            default : new Date
        }
    }]
});

const PersonRating = mongoose.model('PersonRating', PersonRatingSchema);
module.exports = PersonRating;