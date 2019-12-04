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
  tags: {},
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EducationTopic"
    }
  ],
  icon: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});

const EducationSubcategory = mongoose.model("EducationSubcategory", EducationSubcategorySchema);
module.exports = EducationSubcategory;
