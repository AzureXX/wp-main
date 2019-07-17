const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSubcategoryStatusSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subcategory:  { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubcategory' },
    status: Number
});

const EducationSubcategoryStatus= mongoose.model('EducationSubcategoryStatus', EducationSubcategoryStatusSchema);
module.exports = EducationSubcategoryStatus;