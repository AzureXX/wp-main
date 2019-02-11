const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    en: String,
    ru: String,
    az: String
  },
  description: {
    en: String,
    ru: String,
    az: String
  },
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  genres: [String],
})

const Course = mongoose.model("Course", CourseSchema)
module.exports = Course;