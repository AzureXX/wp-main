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
    img: {
        us: String,
        ru: String,
        az: String
    },
    video: {
        us: String,
        ru: String,
        az: String
    },
    link: {
        us: String,
        ru: String,
        az: String
    },
    authors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    }],
    genres: [String],
    tags: {}
})

const Course = mongoose.model("Course", CourseSchema)
module.exports = Course;