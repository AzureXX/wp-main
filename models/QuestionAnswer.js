const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionAnswerSchema = new Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [{type: Number}]
})

const QuestionAnswer = mongoose.model("QuestionAnswer", QuestionAnswerSchema)
module.exports = QuestionAnswer;