const express = require('express');
const router = express.Router();
const passport = require('passport');
const requests = require("../../../utils/requests")

//@route   GET api/recommendations/movie
//@desc    Gets movies recommendations from database
//@access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.getItemRecommendations(req,res,next, "movie")
  }
);

//@route   POST api/recommendations/movie
//@desc    Calculate recommendations for movies
//@access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    await requests.updateItemReccomendations(req,res,next, "movie");
  }
);

module.exports = router;
