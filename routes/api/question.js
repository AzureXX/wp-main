const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const requests = require('../../utils/requests');
const transformation = require('../../utils/transformation');
const Question = require("../../models/Question");
const QuestionAnswer = require("../../models/QuestionAnswer");
//@route   POST api/question/add
//@desc    Adds new question to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, 'question');
  }
);

//@route   PUT api/question/edit/:id
//@desc    Edit question in database
//@access  Private/Moderator
router.put(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.editItem(req, res, next, 'question');
  }
);

//@route   DELETE api/question/delete/:id
//@desc     Delete question from database
//@access  Private/Moderator
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.deleteItem(req, res, next, 'question');
  }
);

//@route   GET api/question/get/all/:page
//@desc    Get all questions by page
//@access  Public
router.get('/get/all/:page?', async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'questions', 20);
});

//@route   GET api/question/get/id/:id
//@desc    Get question by id
//@access  Public
router.get('/get/id/:id', async (req, res, next) => {
  await requests.getItem(req, res, next, 'questions');
});

//@route   POST api/question/answer
//@desc    Answer to question
//@access  Private
router.post(
  '/answer',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      let { answers, question } = req.body
      question = transformation.mongooseId(question);
      if(question == '000000000000000000000000') throw Error("Invalid question ID")
      if(!answers) throw Error("No answer selected");
      if(typeof answers === 'number' ) answer = [answers]
      else if(typeof answers === 'string' && !isNaN(answers) ) answer = [parseInt(answers)]
      else if (typeof answers === 'string' && !isNaN(answers)) throw Error("Invalid answer")

      if( answers.length === 0) {
        await QuestionAnswer.deleteOne({userId: req.user._id, _id: question})
      } else {
        await QuestionAnswer.updateOne({ userId: req.user._id, question: question }, {
          userId: req.user._id,
          question: question,
          answers: answers
        },
        { upsert: true })
      }
      return res.json("success");
    } catch (error) {
      next(error)
    }
  }
);
module.exports = router;
