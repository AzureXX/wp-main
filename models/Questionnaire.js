const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionnaireSchema = new Schema({
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  tags: [{_id: false, name:String, level: Number}]
})

const Questionnaire = mongoose.model("Questionnaire", QuestionnaireSchema)
module.exports = Questionnaire;