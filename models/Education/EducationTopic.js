const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationTopicSchema = new Schema({
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
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubcategory'}],
    subtopics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubtopic'}],
    icon:String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const EducationTopic = mongoose.model("EducationTopic", EducationTopicSchema)
module.exports = EducationTopic;