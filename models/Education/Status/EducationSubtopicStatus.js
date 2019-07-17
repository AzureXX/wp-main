const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSubtopicStatusSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subtopic:  { type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubtopic' },
    status: Number
});

const EducationSubtopicStatus= mongoose.model('EducationSubtopicStatus', EducationSubtopicStatusSchema);
module.exports = EducationSubtopicStatus;