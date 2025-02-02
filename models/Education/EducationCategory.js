const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationCategorySchema = new Schema({
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
    subcategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EducationSubcategory'
    }],
    icon: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const EducationCategory = mongoose.model("EducationCategory", EducationCategorySchema)
module.exports = EducationCategory;