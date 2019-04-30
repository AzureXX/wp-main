const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
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
  authors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person' }],
  genres: [String],
  tags: [{name:String, level: Number}]
})

const Course = mongoose.model("Course", CourseSchema)
module.exports = Course;