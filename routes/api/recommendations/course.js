const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require("../../../utils/requests")

//@route   GET api/recommendations/course
//@desc    Gets courses recommendations from database
//@access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.getItemRecommendations(req,res,next, "course")
  }
);

//@route   POST api/recommendations/course
//@desc    Calculate recommendations for courses
//@access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.updateItemReccomendations(req,res,next, "course");
  }
);

module.exports = router;
