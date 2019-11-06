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
    tags: {},
    icon:String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
})

const EducationSubtopic = mongoose.model("EducationSubtopic", EducationSubtopicSchema)
module.exports = EducationSubtopic;