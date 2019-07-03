const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationSubtopicSchema = new Schema({
    name: {
        us: String,
        ru: String,
        az: String
    },
    description: {
        us: String,
        ru: String,
        az: String
    },
    img: {
        us: String,
        ru: String,
        az: String
    },
    tags: [{_id: false, name:String, level: Number}],
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EducationTopic'}],
    icon:String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Courses'}]
})

const EducationSubtopic = mongoose.model("EducationSubtopic", EducationSubtopicSchema)
module.exports = EducationSubtopic;