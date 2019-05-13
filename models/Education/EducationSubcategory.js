const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationSubcategorySchema = new Schema({
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
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EducationCategory' }],
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EducationTopic'}]
})

const EducationSubcategory = mongoose.model("EducationSubcategory", EducationSubcategorySchema)
module.exports = EducationSubcategory;