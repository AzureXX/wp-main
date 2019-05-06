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
    tags: [String],
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubcategory'}]
})

const EducationTopic = mongoose.model("EducationTopic", EducationTopicSchema)
module.exports = EducationTopic;