const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionarySchema = new Schema({
  multiple: Boolean,
  text: String,
  answers: [{
    text: String,
    result: [{
      tagname: String,
      effect: Number
    }]
  }]
  
})

const Questionary = mongoose.model("Questionary", QuestionarySchema)
module.exports = Questionary;