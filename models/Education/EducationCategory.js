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
    tags: [String],
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'EducationSubcategory'}],
    icon:String
})

const EducationCategory = mongoose.model("EducationCategory", EducationCategorySchema)
module.exports = EducationCategory;