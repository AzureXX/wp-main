const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSubcategoryRatingSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subcategories: [{
        _id: false,
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubcategory' },
        status: Number,
        rating: Number
    }]
});

const EducationSubcategoryRating = mongoose.model('EducationSubcategoryRating', EducationSubcategoryRatingSchema);
module.exports = EducationSubcategoryRating;