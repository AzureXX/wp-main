const express = require('express');
const router = express.Router();
const passport = require('passport');
const roles = require('../../utils/roles');
const Question = require('../../models/Question');

//@route   GET api/question/get/all/:page
//@desc    Get all books by page
//@access  Public
router.get(
  '/get/all/:page',
  //passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    try {
      let page = parseInt(req.params.page);
      const size = 3;
      if (isNaN(page)) page = 1;
      const questions = await Question.find()
      .skip(offset)
      .limit(size);
      if (questions.length == 0) throw new Error('No such page');
      if (questions.length < size) res.json({ lastPage: true, questions });
      res.json({ lastPage: false, questions });
    } catch {
      next(error)
    }
  }
);

module.exports = router;
