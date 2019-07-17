const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationTopicStatusSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    topic:  { type: mongoose.Schema.Types.ObjectId, ref: 'EducationTopic' },
    status: Number
});

const EducationTopicStatus= mongoose.model('EducationTopicStatus', EducationTopicStatusSchema);
module.exports = EducationTopicStatus;