const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  multiple: Boolean,
  text: String,
  answers: [{
    _id: false,
    text: String,
    result: [{
      tagname: String,
      effect: Number
    }]
  }],
  tags: [{_id: false, name:String, level: Number}]
})

const Question = mongoose.model("Question", QuestionSchema)
module.exports = Question;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;