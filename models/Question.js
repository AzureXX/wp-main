const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  multiple: Boolean,
  text: {
    us: String,
    ru: String,
    az: String
  },
  answers: [
    {
      _id: false,
      text: {
        us: String,
        ru: String,
        az: String
      },
      result: [
        {
          tagName: String,
          effect: Number
        }
      ]
    }
  ],
  tags: {}
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
