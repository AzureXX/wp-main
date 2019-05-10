const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationCategoryRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categories: [{
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationCategory' },
        status: Number,
        rating: Number
    }]
});

const EducationCategoryRating = mongoose.model('EducationCategoryRating', EducationCategoryRatingSchema);
module.exports = EducationCategoryRating;