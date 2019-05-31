const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionarySchema = new Schema({
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  tags: [{_id: false, name:String, level: Number}]
})

const Questionary = mongoose.model("Questionary", QuestionarySchema)
module.exports = Questionary;