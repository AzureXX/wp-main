const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationCategoryStatusSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category:  { type: mongoose.Schema.Types.ObjectId, ref: 'EducationCategory' },
    status: Number
});

const EducationCategoryStatus= mongoose.model('EducationCategoryStatus', EducationCategoryStatusSchema);
module.exports = EducationCategoryStatus;