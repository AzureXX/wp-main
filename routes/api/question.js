const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Question = require('../../models/Question');

const requests = require('../../utils/requests');
//@route   POST api/question/add
//@desc    Adds new question to database
//@access  Private/Moderator
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  roles.isModerator,
  async (req, res, next) => {
    await requests.createItem(req, res, next, Question, 'question');
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
    await requests.editItem(req, res, next, Question, 'question');
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
    await requests.deleteItem(req, res, next, Question);
  }
);

//@route   GET api/question/get/all/:page
//@desc    Get all questions by page
//@access  Public
router.get('/get/all/:page?', roles.isUser, async (req, res, next) => {
  await requests.getAllItems(req, res, next, 'questions', 20);
});

//@route   GET api/question/get/id/:id
//@desc    Get question by id
//@access  Public
router.get('/get/id/:id', roles.isUser, async (req, res, next) => {
  await requests.getItem(req, res, next, 'questions');
});

module.exports = router;
